import { GetServerSideProps } from 'next'
import Nav from '@components/nav'
import { getPostComments } from '@lib/reddit'
import Head from 'next/head'
import Comment from '@components/comment'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import kFormatter from '@lib/numFormat'
import MediaPreview from '@components/media'
import SpecialLink from '@components/link'
import marked from 'marked'

dayjs.extend(relativeTime)

export default function Comments({ postDataRaw }) {
  const postData = postDataRaw[0].data.children[0].data
  const postComments = postDataRaw[1].data.children
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Nav showBack />
      <div className='flex flex-col max-w-3xl px-5 py-5 mx-auto'>
        <h1 className='mx-4 text-3xl text-center md:mx-0'>{postData.title}</h1>
        <div className='flex self-center my-1 text-gray-600 dark:text-gray-300'>
          <div>
            <span className='mx-2'>
              <SpecialLink href={`/${postData.subreddit_name_prefixed}`}>
                {postData.subreddit_name_prefixed}
              </SpecialLink>
            </span>
            <span
              className={
                postData.distinguished
                  ? postData.distinguished === 'admin'
                    ? 'text-red-400'
                    : 'text-green-600 dark:text-green-400'
                  : '' + ' mx-2'
              }
            >
              <SpecialLink href={`/u/${postData.author}`}>u/{postData.author}</SpecialLink>
            </span>
            <span className='mx-2'>{kFormatter(postData.score)}</span>
            <span className='mx-2' title={dayjs.unix(postData.created_utc).toISOString()}>
              {dayjs.unix(postData.created_utc).fromNow()}
            </span>
          </div>
          <div className='self-center'>
            {postData.stickied === true && (
              <div
                className='inline-block w-3 h-3 ml-1 bg-green-600 rounded-full dark:bg-green-400'
                title='Post stickied'
              ></div>
            )}
            {postData.locked === true && (
              <div className='inline-block w-3 h-3 ml-1 bg-yellow-400 rounded-full' title='Post locked'></div>
            )}
            {postData.archived === true && (
              <div className='inline-block w-3 h-3 ml-1 bg-orange-400 rounded-full' title='Post archived'></div>
            )}
          </div>
        </div>

        <div className='my-10'>
          {/* preview container */}
          {postData.selftext !== '' && (
            <div
              className='text-gray-700 dark:text-gray-200 markdown'
              dangerouslySetInnerHTML={{ __html: marked(postData.selftext) }}
            />
          )}
          {!postData.is_self && <MediaPreview post={postData} />}
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

export const getServerSideProps: GetServerSideProps = async context => {
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
