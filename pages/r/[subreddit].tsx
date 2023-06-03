import LoadMoreButton from '@components/loadmore'
import Nav from '@components/nav'
import Post from '@components/post'
import { getKeyForSubredditPosts, getSubredditInfo } from '@lib/reddit'
import { GetServerSideProps } from 'next'
import useSWRInfinite from 'swr/infinite'

export default function SubredditPage({ subredditInfo }) {
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    getKeyForSubredditPosts(subredditInfo.data.display_name)
  )

  return (
    <div>
      <Nav />
      <div className='py-5'>
        <h1 className='text-5xl text-center text-accent-1'>{subredditInfo.data.display_name_prefixed}</h1>
        <p className='text-xl text-center text-gray-600 dark:text-gray-300'>{subredditInfo.data.title}</p>
      </div>

      <div className='max-w-3xl px-5 pb-10 mx-auto'>
        {data?.map(page => page.data?.children.map(({ data }) => <Post postData={data} key={data.id} />))}

        <LoadMoreButton setSize={setSize} isLoading={isLoading || isValidating} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { subreddit } = context.params
  if (!subreddit || subreddit === '') return //context.res.redirect('/')
  const subredditInfo = await getSubredditInfo(subreddit as string)
  return {
    props: {
      subredditInfo
    }
  }
}
