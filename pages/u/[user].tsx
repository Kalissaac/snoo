import LoadMoreButton from '@components/loadmore'
import Nav from '@components/nav'
import Post from '@components/post'
import Comment from '@components/comment'
import { getKeyForUserActivity } from '@lib/reddit'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import kFormatter from '@lib/numFormat'

export default function UserPage() {
  const router = useRouter()
  const { user } = router.query
  const { data: userInfo } = useSWR(user ? `/user/${user}/about.json` : null)
  const {
    data: userActivity,
    isLoading,
    isValidating,
    setSize
  } = useSWRInfinite(user ? getKeyForUserActivity(user as string) : null)

  return (
    <div>
      <Nav />
      <div className='py-5'>
        <h1 className='text-5xl text-center text-accent-1'>u/{userInfo?.data.name}</h1>
        <p className='mt-1 text-xl text-center text-gray-600 dark:text-gray-300'>
          {kFormatter(userInfo?.data.total_karma)} karma
        </p>
      </div>

      <div className='max-w-3xl px-5 mx-auto'>
        {userActivity?.map(page =>
          page.data?.children.map(({ kind, data }) => {
            switch (kind) {
              case 't1':
                return <Comment comment={data} key={data.id} />
              case 't3':
                return <Post postData={data} key={data.id} />
            }
          })
        )}

        <LoadMoreButton setSize={setSize} isLoading={isLoading || isValidating} />
      </div>
    </div>
  )
}
