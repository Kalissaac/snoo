import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import showdown from 'showdown'
import kFormatter from '@lib/numFormat'
import { isImage, isVideo, getProperVideoUrl, getVideoMimeType, isYouTube } from '@lib/media'

dayjs.extend(relativeTime)
const converter = new showdown.Converter()

export default function Post({ postData }) {
  return (
    <Link href={postData.permalink}>
      <a className="w-full h-full block">
        <div className="bg-darker-gray rounded-lg my-6 p-6 shadow-xl flex flex-col overflow-hidden" id={postData.id}>
          <div className="flex container max-w-full"> {/* info container */}
            <div className="voting min-w-12 h-full flex justify-center items-center">
              <div className="text-gray-300">{kFormatter(postData.score)}</div>
            </div>
            <div className="ml-4 flex-grow">
              <div className="mb-2 flex justify-between w-full">
                <div>
                  <span className="mr-2"><Link href={'/' + postData.subreddit_name_prefixed}>{postData.subreddit_name_prefixed}</Link></span>
                  <span className={postData.distinguished ? postData.distinguished === 'admin' ? 'text-red-400' : 'text-green-400' : 'text-gray-300' + ' mx-2'}><Link href={'/u/' + postData.author}>{'u/' + postData.author}</Link></span>
                  <span className="text-gray-300 mx-2">{dayjs.unix(postData.created_utc).fromNow()}</span>
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
              <h1 className="text-blue-500 text-xl"><Link href={'' + postData.permalink}><a>{postData.title}</a></Link></h1>  {/* TODO: remove reddit.com */}
              { postData.selftext !== '' &&
                <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: converter.makeHtml(truncate(postData.selftext, 1000))}} ></p>
              }
            </div>
          </div>
          <div className="ml-16 mt-2"> {/* preview container */}
            { isImage(postData.url) &&
              <img className="max-w-full object-contain" style={{ maxHeight: '36rem' }} src={postData.url} alt={postData.title}/>
            }
            { isVideo(postData.url) &&
              <video controls autoPlay className="h-64 w-64">
                <source src={getProperVideoUrl(postData.url)} type={getVideoMimeType(postData.url)} />
              </video>
            }
            { isYouTube(postData.url) !== null &&
              <iframe width="100%" height="762" src={'https://www.youtube-nocookie.com/embed/' + isYouTube(postData.url)[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            }
          </div>
        </div>
      </a>
    </Link>
  )
}

function truncate(str: string, n: number, useWordBoundary: boolean = true){
  if (str.length <= n) return str
  const subString = str.substr(0, n - 1); // the original check
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" "))
    : subString) + "&hellip;";
}
