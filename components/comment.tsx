import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import kFormatter from '@lib/numFormat'
import SpecialLink from '@components/link'
import marked from 'marked'

dayjs.extend(relativeTime)

export default function ParentComment({ comment }) {
  return (
    <div className='p-6 pt-2 my-2 rounded-lg shadow-sm bg-gray-50 dark:bg-darker-gray'>
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

function Comment({ comment }) {
  return (
    <div className='flex pt-4' id={comment.id}>
      <div className='flex flex-col items-center self-stretch justify-center text-gray-500 voting min-w-12 dark:text-gray-300'>
        {comment.score === 1 ? <p title='Score hidden'>•</p> : <p>{kFormatter(comment.score)}</p>}
        <button
          className='w-2 h-full mt-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700'
          onClick={e =>
            e.currentTarget.parentElement.parentElement
              .getElementsByClassName('commentBody')[0]
              .classList.add('sr-only') !== null &&
            e.currentTarget.parentElement.parentElement.classList.add('cursor-pointer')
          }
        />
      </div>
      <div
        className='flex-grow ml-4'
        onClick={e =>
          e.currentTarget.parentElement.getElementsByClassName('commentBody')[0].classList.remove('sr-only') !== null &&
          e.currentTarget.parentElement.classList.remove('cursor-pointer')
        }
      >
        <div className='flex justify-between mb-2'>
          <div>
            <span
              className={
                comment.distinguished
                  ? comment.distinguished === 'admin'
                    ? 'text-red-400'
                    : 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400'
              }
            >
              <SpecialLink href={`/u/${comment.author}`} children={`u/${comment.author}`} />
            </span>
            <span
              className='mx-2 text-gray-600 dark:text-gray-300'
              title={dayjs.unix(comment.created_utc).toISOString()}
            >
              {dayjs.unix(comment.created_utc).fromNow()}
            </span>
          </div>
          <div className='self-center'>
            {comment.stickied === true && (
              <div
                className='inline-block w-3 h-3 ml-1 bg-green-600 dark:bg-green-400 rounded-full'
                title='Comment stickied'
              ></div>
            )}
            {comment.edited === true && (
              <div className='inline-block w-3 h-3 ml-1 bg-yellow-400 rounded-full' title='Comment edited'></div>
            )}
            {comment.gilded === true && (
              <div className='inline-block w-3 h-3 ml-1 bg-orange-400 rounded-full' title='Comment gilded'></div>
            )}
          </div>
        </div>
        <div className='commentBody'>
          <div className='markdown' dangerouslySetInnerHTML={{ __html: marked(comment.body) }} />
          {comment.replies &&
            comment.replies.data.children.map(childComment => {
              if (childComment.kind !== 'more') {
                return <Comment comment={childComment.data} key={childComment.data.id} />
              }
            })}
        </div>
      </div>
    </div>
  )
}
