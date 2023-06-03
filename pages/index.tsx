import Nav from '@components/nav'
import Post from '@components/post'
import Head from 'next/head'
import { getKeyForSubredditPosts } from '@lib/reddit'
import useSWRInfinite from 'swr/infinite'
import LoadMoreButton from '@components/loadmore'

export default function IndexPage() {
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(getKeyForSubredditPosts('popular'))

  return (
    <>
      <Head>
        <title>snooooo</title>
      </Head>
      <Nav />

      <div className='py-5'>
        <h1 className='text-5xl text-center dark:text-gray-100'>the front page</h1>
      </div>

      <div className='max-w-3xl px-5 pb-10 mx-auto'>
        {data?.map(page => page.data?.children.map(({ data }) => <Post postData={data} key={data.id} />))}

        <LoadMoreButton setSize={setSize} isLoading={isLoading || isValidating} />
      </div>
    </>
  )
}
