import { GetServerSideProps } from 'next'
import Nav from '@components/nav'
import { getPostComments } from '@lib/reddit'
import Head from 'next/head'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'

dayjs.extend(relativeTime)

export default function Comments({ postData }) {
  if (postData.error) return (
    <div>
      error occured
    </div>
  )
  const postInfo = postData[0].data.children[0].data
  const postComments = postData[1].data.children
  return (
    <>
      <Head>
        <title>{postInfo.title}</title>
      </Head>
      <Nav />
      <div className="py-5 mx-56 flex flex-col">
        <p className="text-3xl text-center">{postInfo.title}</p>

        <div className="m-12 self-center"> {/* preview container */}
        { isImage(postInfo.url) &&
          <img className="max-w-full object-contain" style={{ maxHeight: '36rem' }} src={postInfo.url} alt={postInfo.title}/>
        }
        { isVideo(postInfo.url) &&
          <video controls autoPlay className="h-64 w-64">
            <source src={getProperVideoUrl(postInfo.url)} type={getVideoMimeType(postInfo.url)} />
          </video>
        }
        { isYouTube(postInfo.url) !== null &&
          <iframe width="100%" height="762" src={'https://www.youtube-nocookie.com/embed/' + isYouTube(postInfo.url)[1]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        }
      </div>

        {postComments.map(commentRaw => {
          const comment = commentRaw.data
          return (
            <div className="bg-darker-gray rounded-lg my-2 p-4 shadow-xl flex flex-col overflow-hidden">
              <div className="flex container max-w-full"> {/* info container */}
                <div className="voting min-w-12 h-full flex justify-center items-center">
                  <div className="text-gray-300">{comment.score}</div>
                </div>
                <div className="ml-4">
                  <div className="mb-2 flex justify-between w-full">
                    <div>
                      <span className={comment.distinguished ? comment.distinguished === 'admin' ? 'text-red-300' : 'text-green-300' : 'text-gray-300'}><Link href={'/u/' + comment.author}>{'u/' + comment.author}</Link></span>
                      <span className="text-gray-300 mx-2">{dayjs.unix(comment.created_utc).fromNow()}</span>
                    </div>
                    <div className="self-center">
                      { comment.stickied === true &&
                        <div className="rounded-full h-3 w-3 bg-green-300 inline-block ml-1" title="Comment stickied"></div>
                      }
                      { comment.edited === true &&
                        <div className="rounded-full h-3 w-3 bg-yellow-300 inline-block ml-1" title="Comment edited"></div>
                      }
                      { comment.gilded === true &&
                        <div className="rounded-full h-3 w-3 bg-orange-300 inline-block ml-1" title="Comment gilded"></div>
                      }
                    </div>
                  </div>
                  <p className="">{comment.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subreddit, submission } = context.params
  const postData = await getPostComments(`/r/${subreddit}/comments/${submission}`)
  return {
    props: {
      postData
    }
  }
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