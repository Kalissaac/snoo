import { GetServerSideProps } from 'next'
import Nav from '@components/nav'
import { getPostComments } from '@lib/reddit'
import Head from 'next/head'
import Comment from '@components/comment'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import showdown from 'showdown'
import kFormatter from '@lib/numFormat'
import MediaPreview from '@components/media'
import SpecialLink from '@components/link'

dayjs.extend(relativeTime)
const converter = new showdown.Converter()

export default function Comments({ postDataRaw }) {
  const postData = postDataRaw[0].data.children[0].data
  const postComments = postDataRaw[1].data.children
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Nav showBack />
      <div className="py-5 md:mx-24 lg:mx-32 xl:mx-56 flex flex-col">
        <h1 className="text-3xl text-center mx-4 md:mx-0">{postData.title}</h1>
        <div className="my-1 flex self-center text-gray-300">
          <div>
            <span className="mx-2"><SpecialLink href={`/${postData.subreddit_name_prefixed}`} title={postData.subreddit_name_prefixed} /></span>
            <span className={postData.distinguished ? postData.distinguished === 'admin' ? 'text-red-300' : 'text-green-300' : '' + ' mx-2'}><SpecialLink href={`/u/${postData.author}`} title={`u/${postData.author}`} /></span>
            <span className="mx-2">{kFormatter(postData.score)}</span>
            <span className="mx-2" title={dayjs.unix(postData.created_utc).toISOString()}>{dayjs.unix(postData.created_utc).fromNow()}</span>
          </div>
          <div className="self-center">
            { postData.stickied === true &&
              <div className="rounded-full h-3 w-3 bg-green-300 inline-block ml-1" title="Post stickied"></div>
            }
            { postData.locked === true &&
              <div className="rounded-full h-3 w-3 bg-yellow-300 inline-block ml-1" title="Post locked"></div>
            }
            { postData.archived === true &&
              <div className="rounded-full h-3 w-3 bg-orange-300 inline-block ml-1" title="Post archived"></div>
            }
          </div>
        </div>

        <div className="m-10 self-center"> {/* preview container */}
        { postData.selftext !== '' &&
          <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: converter.makeHtml(postData.selftext) }}></p>
        }
        <MediaPreview post={postData} />
      </div>

        {postComments.map(comment => {
          if (comment.kind !== 'more') {
            return <Comment comment={comment.data} key={comment.data.id} />
          }
        })}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subreddit, submission } = context.params
  const postDataRaw = await getPostComments(`/r/${subreddit}/comments/${submission}`)
  if (postDataRaw.error) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      postDataRaw
    }
  }
}
