import Link from 'next/link'
import moment from 'moment'

export default function Post(props) {
  return (
    <a href={props.postData.permalink}> {/* TODO: replace with link tag for better performance */}
      <div className="bg-white rounded-lg mx-32 my-6 p-6 shadow-xl md:flex overflow-hidden" id={props.postData.id}>
        <div className="flex container max-w-full"> {/* info container */}
          <div className="voting min-w-12 h-full flex justify-center items-center">
            <div className="text-gray-700">{props.postData.score}</div>
          </div>
          <div className="ml-4">
            <div className="mb-2 flex justify-between w-full">
              <div>
                <span className="mr-2"><Link href={props.postData.subreddit_name_prefixed}>{props.postData.subreddit_name_prefixed}</Link></span>
                <span className={props.postData.distinguished ? props.postData.distinguished === 'admin' ? 'text-red-600' : 'text-green-600' : 'text-gray-600' + ' mx-2'}><Link href={'u/' + props.postData.author}>{props.postData.author}</Link></span>
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
            <h1 className="text-blue-500 text-xl"><Link href={props.postData.permalink}>{props.postData.title}</Link></h1>
            { props.postData.selftext !== '' &&
              <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: truncate(props.postData.selftext, 1000)}} ></p>
            }
          </div>
        </div>
        <div className="float-right"> {/* preview container */}
          { isImage(props.postData.url) &&
            <img className="h-64 w-64 object-contain" src={props.postData.url} alt={props.postData.title}/>
          }
          { isVideo(props.postData.url) &&
            <video controls autoPlay className="h-64 w-64">
              <source src={getProperVideoUrl(props.postData.url)} type={getVideoMimeType(props.postData.url)} />
            </video>
          }
        </div>
      </div>
    </a>
  )
}

function truncate(str: string, n: number, useWordBoundary: boolean = true){
  if (str.length <= n) return str
  const subString = str.substr(0, n - 1); // the original check
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" "))
    : subString) + "&hellip;";
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
