import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import remark from 'remark'
import html from 'remark-html'

dayjs.extend(relativeTime)

export default function Comment ({ comment }) {
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
          <CommentBody text={comment.body} />
        </div>
      </div>
    </div>
  )
}

function CommentBody ({ text }) {
  const [renderedText, setRenderedText] = useState(text)

  useEffect(() => {
    renderMarkdown(text).then((str) => {
      setRenderedText(str)
    })
  }, [])

  return (
    <p dangerouslySetInnerHTML={{
      __html: renderedText
    }} />
  )
}

async function renderMarkdown(str:string) {
  const processedContent = await remark()
    .use(html)
    .process(str)
  return processedContent.toString()
}
