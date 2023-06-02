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
      className='flex flex-col p-6 my-6 overflow-hidden rounded-lg shadow-xl bg-darker-gray'
      id={postData.id}
      onClick={() => router.push(postData.permalink)}
    >
      <div className='flex max-w-full'>
        {' '}
        {/* info container */}
        <div className='flex items-center justify-center h-full voting min-w-12'>
          <div className='text-gray-300'>{kFormatter(postData.score)}</div>
        </div>
        <div className='flex-grow ml-4'>
          <div className='flex justify-between w-full mb-2'>
            <div>
              <span className='mr-2'>
                <SpecialLink href={`/${postData.subreddit_name_prefixed}`} title={postData.subreddit_name_prefixed} />
              </span>
              <span
                className={
                  postData.distinguished
                    ? postData.distinguished === 'admin'
                      ? 'text-red-400'
                      : 'text-green-400'
                    : 'text-gray-300' + ' mx-2'
                }
              >
                <SpecialLink href={`/u/${postData.author}`} title={`u/${postData.author}`} />
              </span>
              <span className='mx-2 text-gray-300' title={dayjs.unix(postData.created_utc).toISOString()}>
                {dayjs.unix(postData.created_utc).fromNow()}
              </span>
            </div>
            <div className='self-center'>
              {postData.stickied === true && (
                <div className='inline-block w-3 h-3 ml-1 bg-green-400 rounded-full' title='Post stickied'></div>
              )}
              {postData.locked === true && (
                <div className='inline-block w-3 h-3 ml-1 bg-yellow-400 rounded-full' title='Post locked'></div>
              )}
              {postData.archived === true && (
                <div className='inline-block w-3 h-3 ml-1 bg-orange-400 rounded-full' title='Post archived'></div>
              )}
            </div>
          </div>
          <h1 className='text-xl text-blue-500'>
            <SpecialLink href={postData.permalink} title={postData.title} customClass='hover:border-blue-500' />
          </h1>
          {postData.selftext !== '' && (
            <div
              className='text-sm text-gray-400 markdown'
              dangerouslySetInnerHTML={{ __html: marked(truncate(postData.selftext, 1000)) }}
            />
          )}
        </div>
      </div>
      <div className='mt-2 ml-16'>
        {' '}
        {/* preview container */}
        <MediaPreview post={postData} />
      </div>
    </div>
  )
}

function truncate(str: string, n: number, useWordBoundary: boolean = true) {
  if (str.length <= n) return str
  const subString = str.substr(0, n - 1) // the original check
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '&hellip;'
}
