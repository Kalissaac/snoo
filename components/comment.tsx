import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Link from 'next/link'
import showdown from 'showdown'
import kFormatter from '@lib/numFormat'

dayjs.extend(relativeTime)
const converter = new showdown.Converter()

export default function ParentComment ({ comment }) {
  return (
    <div className='bg-darker-gray rounded-lg my-2 p-6 pl-4 pt-2'>
      <Comment comment={comment} />
    </div>
  )
}

function Comment ({ comment }) {
  return (
    <div className="pl-4 pt-6 shadow-xl flex container overflow-hidden">
      <div className="voting min-w-12 flex flex-col self-stretch justify-center items-center">
        <div className="text-gray-300">{kFormatter(comment.score)}</div>
        <button className='h-full w-2 mt-2 bg-gray-900 hover:bg-gray-700 rounded-full' onClick={e => e.currentTarget.parentElement.parentElement.getElementsByClassName('commentBody')[0].classList.add('sr-only') !== null && e.currentTarget.parentElement.parentElement.classList.add('cursor-pointer')} />
      </div>
      <div className="ml-4 flex-grow" onClick={e => e.currentTarget.parentElement.getElementsByClassName('commentBody')[0].classList.remove('sr-only') !== null && e.currentTarget.parentElement.classList.remove('cursor-pointer')}>
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
