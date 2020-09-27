import Nav from '../components/nav'
import Post from '../components/post'
import { getRedditPosts } from '../lib/reddit'

export default function IndexPage({ redditPosts }) {
  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="py-5">
        <h1 className="text-5xl text-center text-accent-1">
          Snooooo
        </h1>
      </div>

      {redditPosts.data.children.map(({ data }) => (
        <Post postData={data} key={data.id}/>
      ))}
    </div>
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
