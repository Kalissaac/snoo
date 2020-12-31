import Link from 'next/link'
import moment from 'moment'
import remark from 'remark'
import html from 'remark-html'

export default function Post(props) {

  return (
    <div className="bg-white rounded-lg mx-56 my-6 p-6 shadow-xl flex flex-col overflow-hidden" id={props.postData.id}>
      <div className="flex container max-w-full"> {/* info container */}
        <div className="voting min-w-12 h-full flex justify-center items-center">
          <div className="text-gray-700">{props.postData.score}</div>
        </div>
        <div className="ml-4">
          <div className="mb-2 flex justify-between w-full">
            <div>
              <span className="mr-2"><Link href={'/' + props.postData.subreddit_name_prefixed}>{props.postData.subreddit_name_prefixed}</Link></span>
              <span className={props.postData.distinguished ? props.postData.distinguished === 'admin' ? 'text-red-600' : 'text-green-600' : 'text-gray-600' + ' mx-2'}><Link href={'/u/' + props.postData.author}>{'u/' + props.postData.author}</Link></span>
              <span className="text-gray-600 mx-2">{moment.unix(props.postData.created_utc).fromNow()}</span>
            </div>
            <div className="self-center">
              { props.postData.stickied === true &&
                <div className="rounded-full h-3 w-3 bg-green-600 inline-block ml-1" title="Post stickied"></div>
              }
              { props.postData.locked === true &&
                <div className="rounded-full h-3 w-3 bg-yellow-600 inline-block ml-1" title="Post locked"></div>
              }
              { props.postData.archived === true &&
                <div className="rounded-full h-3 w-3 bg-orange-600 inline-block ml-1" title="Post archived"></div>
              }
            </div>
          </div>
          <h1 className="text-blue-500 text-xl"><Link href={'https://reddit.com' + props.postData.permalink}>{props.postData.title}</Link></h1>  {/* TODO: remove reddit.com */}
          { props.postData.selftext !== '' &&
            <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: truncate(props.postData.selftext, 1000)}} ></p>
          }
        </div>
      </div>
      <div className="ml-16"> {/* preview container */}
        { isImage(props.postData.url) &&
          <img className="max-w-full object-contain" style={{ maxHeight: '36rem' }} src={props.postData.url} alt={props.postData.title}/>
        }
        { isVideo(props.postData.url) &&
          <video controls autoPlay className="h-64 w-64">
            <source src={getProperVideoUrl(props.postData.url)} type={getVideoMimeType(props.postData.url)} />
          </video>
        }
        { isYouTube(props.postData.url) !== null &&
          <iframe width="100%" height="762" src={'https://www.youtube-nocookie.com/embed/' + isYouTube(props.postData.url)[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        }
      </div>
      <a href={props.postData.permalink} className="w-full h-full" /> {/* TODO: replace with link tag for better performance */}
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

async function renderMarkdown(str:string) {
  const processedContent = await remark()
    .use(html)
    .process(str)
  return processedContent.toString()
}

function isImage (url: String) {
  return url.match(/\b(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)$\b/i)
}

function isVideo (url: String) {
  return url.match(/\b(mp4|gifv|m4v|mov|webm|3gp|ogg|mpeg)$\b/i)
}

function getVideoMimeType (url: String) {
  let type = url.split('.').pop()
  if (type === 'gifv') type = 'mp4'
  return 'video/' + type
}

function getProperVideoUrl (url: String) {
  const newUrl = url.split('.')
  let type = newUrl.pop() || ''
  if (type === 'gifv') type = 'mp4'
  newUrl.push(type)
  return newUrl.join('.')
}

function isYouTube (url: String) {
  return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
}
