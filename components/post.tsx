import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
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
    <div className="bg-darker-gray rounded-lg my-6 p-6 shadow-xl flex flex-col overflow-hidden" id={postData.id} onClick={() => router.push(postData.permalink)}>
      <div className="flex max-w-full"> {/* info container */}
        <div className="voting min-w-12 h-full flex justify-center items-center">
          <div className="text-gray-300">{kFormatter(postData.score)}</div>
        </div>
        <div className="ml-4 flex-grow">
          <div className="mb-2 flex justify-between w-full">
            <div>
              <span className="mr-2"><SpecialLink href={`/${postData.subreddit_name_prefixed}`} title={postData.subreddit_name_prefixed} /></span>
              <span className={postData.distinguished ? postData.distinguished === 'admin' ? 'text-red-400' : 'text-green-400' : 'text-gray-300' + ' mx-2'}><SpecialLink href={`/u/${postData.author}`} title={`u/${postData.author}`} /></span>
              <span className="text-gray-300 mx-2" title={dayjs.unix(postData.created_utc).toISOString()}>{dayjs.unix(postData.created_utc).fromNow()}</span>
            </div>
            <div className="self-center">
              { postData.stickied === true &&
                <div className="rounded-full h-3 w-3 bg-green-400 inline-block ml-1" title="Post stickied"></div>
              }
              { postData.locked === true &&
                <div className="rounded-full h-3 w-3 bg-yellow-400 inline-block ml-1" title="Post locked"></div>
              }
              { postData.archived === true &&
                <div className="rounded-full h-3 w-3 bg-orange-400 inline-block ml-1" title="Post archived"></div>
              }
            </div>
          </div>
          <h1 className="text-blue-500 text-xl"><SpecialLink href={postData.permalink} title={postData.title} customClass='hover:border-blue-500' /></h1>
          { postData.selftext !== '' &&
            <p className="text-gray-400 text-sm markdown" dangerouslySetInnerHTML={{ __html: marked(truncate(postData.selftext, 1000))}} ></p>
          }
        </div>
      </div>
      <div className="ml-16 mt-2"> {/* preview container */}
        <MediaPreview post={postData} />
      </div>
    </div>
  )
}

function truncate(str: string, n: number, useWordBoundary: boolean = true){
  if (str.length <= n) return str
  const subString = str.substr(0, n - 1); // the original check
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" "))
    : subString) + "&hellip;";
}
