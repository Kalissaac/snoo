import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import kFormatter from '@lib/numFormat'
import MediaPreview from '@components/media'
import { useRouter } from 'next/router'
import SpecialLink from '@components/link'
import marked from 'marked'

dayjs.extend(relativeTime)

export default function Post({ postData }) {
  const router = useRouter()

  /* Idea to show content while comments load: (Data is then loaded in post detail page)
  useEffect(() => {
    function handleRouteChange (url: string) {
      if (url + '/' === postData.permalink) {
        window.sessionStorage.setItem(postData.id, JSON.stringify(postData))
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  */

  return (
    <div
      className='relative flex max-w-full p-5 my-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 bg-gray-50 dark:bg-darker-gray'
      id={postData.id}
    >
      {/* info container */}
      <div className='flex items-center justify-center h-full voting min-w-[2.5rem] text-gray-700 dark:text-gray-300'>
        {postData.score === 1 ? <p title='Score hidden'>•</p> : <p>{kFormatter(postData.score)}</p>}
      </div>
      <div className='flex-grow ml-4'>
        <div className='flex justify-between w-full mb-2'>
          <div className='space-x-4 text-gray-600 dark:text-gray-300'>
            <span>
              <SpecialLink href={`/${postData.subreddit_name_prefixed}`} className='relative z-10'>
                {postData.subreddit_name_prefixed}
              </SpecialLink>
            </span>
            <span
              className={
                postData.distinguished
                  ? postData.distinguished === 'admin'
                    ? 'text-red-400'
                    : 'text-green-600 dark:text-green-400'
                  : ''
              }
            >
              <SpecialLink href={`/u/${postData.author}`} className='relative z-10'>
                u/{postData.author}
              </SpecialLink>
            </span>
            <span title={dayjs.unix(postData.created_utc).toLocaleString()}>
              {dayjs.unix(postData.created_utc).fromNow()}
            </span>
            <span>
              {kFormatter(postData.num_comments)} comment{postData.num_comments !== 1 && 's'}
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
        <h1 className='text-lg font-medium text-orange-600a'>
          <SpecialLink href={postData.permalink} className='!hover:border-orange-500 after:absolute after:inset-0'>
            {postData.title}
          </SpecialLink>
        </h1>
        {postData.selftext && (
          <div
            className='mt-1 text-sm text-gray-800 dark:text-gray-400 markdown'
            dangerouslySetInnerHTML={{ __html: marked(truncate(postData.selftext, 1000)) }}
          />
        )}
        {!postData.is_self && (
          <div className='mt-4'>
            {/* preview container */}
            <MediaPreview post={postData} />
          </div>
        )}
      </div>
    </div>
  )
}

function truncate(str: string, n: number, useWordBoundary: boolean = true) {
  if (str.length <= n) return str
  const subString = str.substr(0, n - 1) // the original check
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '&hellip;'
}
