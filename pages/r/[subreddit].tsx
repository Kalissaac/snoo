import Nav from '@components/nav'
import Post from '@components/post'
import { getRedditPosts, getSubredditInfo } from '@lib/reddit'
import { GetServerSideProps } from 'next'

export default function SubredditPage({ redditPosts, subredditInfo }) {
  return (
    <div>
      <Nav />
      <div className='py-5'>
        <h1 className='text-5xl text-center text-accent-1'>{subredditInfo.data.display_name_prefixed}</h1>
        <p className='text-xl text-center text-gray-300'>{subredditInfo.data.title}</p>
      </div>

      <div className='md:mx-24 lg:mx-32 xl:mx-56'>
        {redditPosts.data.children.map(({ data }) => (
          <Post postData={data} key={data.id} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { subreddit } = context.params
  if (!subreddit || subreddit === '') return //context.res.redirect('/')
  const redditPosts = await getRedditPosts(subreddit as string)
  const subredditInfo = await getSubredditInfo(subreddit as string)
  return {
    props: {
      redditPosts,
      subredditInfo
    }
  }
}
