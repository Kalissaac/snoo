import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'
import showdown from 'showdown'
import kFormatter from '@lib/numFormat'

dayjs.extend(relativeTime)
const converter = new showdown.Converter()

export default function ParentComment ({ comment }) {
  return (
    <div className='bg-darker-gray rounded-lg my-2 p-6 pt-2'>
      <Comment comment={comment} />
    </div>
  )
}

/**
 * FIXME: KNOWN ISSUE:
 * On small screens (<500px wide), the text content inside comments will
 * extend the space allocated inside the div. This issue stems from the div
 * containing the contentBody overextending outside the flexbox.
 * I have no idea how to fix this issue, will tackle at a later date.
 */

function Comment ({ comment }) {
  return (
    <div className="pt-4 shadow-xl flex" id={comment.id}>
      <div className="voting min-w-12 flex flex-col self-stretch justify-center items-center">
        <div className="text-gray-300">{kFormatter(comment.score)}</div>
        <button className='h-full w-2 xl:w-1 mt-2 bg-gray-900 hover:bg-gray-700 rounded-full' onClick={e => e.currentTarget.parentElement.parentElement.getElementsByClassName('commentBody')[0].classList.add('sr-only') !== null && e.currentTarget.parentElement.parentElement.classList.add('cursor-pointer')} />
      </div>
      <div className="ml-4 flex-grow" onClick={e => e.currentTarget.parentElement.getElementsByClassName('commentBody')[0].classList.remove('sr-only') !== null && e.currentTarget.parentElement.classList.remove('cursor-pointer')}>
        <div className="mb-2 flex justify-between">
          <div>
            <span className={comment.distinguished ? comment.distinguished === 'admin' ? 'text-red-400' : 'text-green-400' : 'text-gray-400'}><Link href={'/u/' + comment.author}>{'u/' + comment.author}</Link></span>
            <span className="text-gray-300 mx-2">{dayjs.unix(comment.created_utc).fromNow()}</span>
          </div>
          <div className="self-center">
            { comment.stickied === true &&
              <div className="rounded-full h-3 w-3 bg-green-400 inline-block ml-1" title="Comment stickied"></div>
            }
            { comment.edited === true &&
              <div className="rounded-full h-3 w-3 bg-yellow-400 inline-block ml-1" title="Comment edited"></div>
            }
            { comment.gilded === true &&
              <div className="rounded-full h-3 w-3 bg-orange-400 inline-block ml-1" title="Comment gilded"></div>
            }
          </div>
        </div>
        <div className='commentBody'>
          <p dangerouslySetInnerHTML={{ __html: converter.makeHtml(comment.body)}} />
          {comment.replies && comment.replies.data.children.map(childComment => {
            if (childComment.kind !== 'more') {
              return <Comment comment={childComment.data} key={childComment.data.id} />
            }
          })}
        </div>
      </div>
    </div>
  )
}
