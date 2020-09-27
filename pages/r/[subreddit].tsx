import Nav from '../../components/nav'
import Post from '../../components/post'
import { getRedditPosts, getSubredditInfo } from '../../lib/reddit'
import { GetServerSideProps } from 'next'

export default function SubredditPage({ redditPosts, subredditInfo }) {
  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="py-5">
        <h1 className="text-5xl text-center text-accent-1">{subredditInfo.data.display_name_prefixed}</h1>
        <p className="text-xl text-center text-gray-700">{subredditInfo.data.title}</p>
      </div>

      {redditPosts.data.children.map(({ data }) => (
        <Post postData={data} key={data.id}/>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subreddit } = context.params
  if (!subreddit || subreddit === '') return //context.res.redirect('/')
  const redditPosts = await getRedditPosts(subreddit)
  const subredditInfo = await getSubredditInfo(subreddit)
  return {
    props: {
      redditPosts,
      subredditInfo
    }
  }
}
