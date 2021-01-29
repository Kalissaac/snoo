import { GetServerSideProps } from 'next'
import Nav from '@components/nav'
import { getPostComments } from '@lib/reddit'
import Head from 'next/head'
import Comment from '@components/comment'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'
import showdown from 'showdown'
import kFormatter from '@lib/numFormat'
import { getProperVideoUrl, getVideoMimeType, isImage, isVideo, isYouTube } from '@lib/media'

dayjs.extend(relativeTime)
const converter = new showdown.Converter()

export default function Comments({ postData }) {
  const postInfo = postData[0].data.children[0].data
  const postComments = postData[1].data.children
  return (
    <>
      <Head>
        <title>{postInfo.title}</title>
      </Head>
      <Nav />
      <div className="py-5 md:mx-24 lg:mx-32 xl:mx-56 flex flex-col">
        <h1 className="text-3xl text-center">{postInfo.title}</h1>
        <div className="my-1 flex self-center text-gray-300">
          <div>
            <span className="mr-2"><Link href={'/' + postInfo.subreddit_name_prefixed}>{postInfo.subreddit_name_prefixed}</Link></span>
            <span className={postInfo.distinguished ? postInfo.distinguished === 'admin' ? 'text-red-300' : 'text-green-300' : '' + ' mx-2'}><Link href={'/u/' + postInfo.author}>{'u/' + postInfo.author}</Link></span>
            <span className="mx-2">{kFormatter(postInfo.score)}</span>
            <span className="mx-2">{dayjs.unix(postInfo.created_utc).fromNow()}</span>
          </div>
          <div className="self-center">
            { postInfo.stickied === true &&
              <div className="rounded-full h-3 w-3 bg-green-300 inline-block ml-1" title="Post stickied"></div>
            }
            { postInfo.locked === true &&
              <div className="rounded-full h-3 w-3 bg-yellow-300 inline-block ml-1" title="Post locked"></div>
            }
            { postInfo.archived === true &&
              <div className="rounded-full h-3 w-3 bg-orange-300 inline-block ml-1" title="Post archived"></div>
            }
          </div>
        </div>

        <div className="m-10 self-center"> {/* preview container */}
        { postInfo.selftext !== '' &&
          <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: converter.makeHtml(postInfo.selftext) }}></p>
        }
        { isImage(postInfo.url) &&
          <img className="max-w-full object-contain" style={{ maxHeight: '36rem' }} src={postInfo.url} alt={postInfo.title}/>
        }
        { isVideo(postInfo.url) &&
          <video controls autoPlay className="h-64 w-64">
            <source src={getProperVideoUrl(postInfo.url)} type={getVideoMimeType(postInfo.url)} />
          </video>
        }
        { isYouTube(postInfo.url) !== null &&
          <iframe className="h-64 w-full" src={'https://www.youtube-nocookie.com/embed/' + isYouTube(postInfo.url)[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        }
      </div>

        {postComments.map(({ data }) => (
          <Comment comment={data} key={data.id} />
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subreddit, submission } = context.params
  const postData = await getPostComments(`/r/${subreddit}/comments/${submission}`)
  if (postData.error) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      postData
    }
  }
}
