import { GetServerSideProps } from 'next'
import Nav from '@components/nav'
import { getPostComments } from '@lib/reddit'
import Head from 'next/head'
import Comment from '@components/comment'
import PostInfo from '@components/fragments/postInfo'
import PostBadges from '@components/fragments/postBadges'
import PostBody from '@components/fragments/postBody'

export default function PostCommentsPagr({ postDataRaw }) {
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
          <PostInfo post={postData}>
            <PostBadges post={postData} />
          </PostInfo>
        </div>

        <PostBody post={postData} className='mb-10' />

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
