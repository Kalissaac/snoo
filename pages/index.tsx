import Nav from '@components/nav'
import Post from '@components/post'
import Head from 'next/head'
import { getRedditPosts } from '@lib/reddit'

export default function IndexPage({ redditPosts }) {
  return (
    <>
      <Head>
        <title>snooooo</title>
      </Head>
      <Nav />

      <div className="py-5">
        <h1 className="text-5xl text-center text-gray-100">
          Snooooo
        </h1>
      </div>

      {redditPosts.data.children.map(({ data }) => (
        <Post postData={data} key={data.id}/>
      ))}
    </>
  )
}

export async function getServerSideProps() {
  const redditPosts = await getRedditPosts()
  return {
    props: {
      redditPosts
    }
  }
}
