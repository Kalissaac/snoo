import dayjs from 'dayjs'
import kFormatter from '@lib/numFormat'
import SpecialLink from '@components/link'
import RenderedMarkdown from './fragments/renderedMarkdown'

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
      <div className='flex flex-col items-center self-stretch justify-center text-gray-500 voting min-w-12 dark:text-gray-400'>
        {comment.score === 1 ? <p title='Score hidden'>•</p> : <p>{kFormatter(comment.score)}</p>}
        <button
          className='h-full px-2 mt-2 group'
          onClick={e =>
            e.currentTarget.parentElement.parentElement
              .getElementsByClassName('commentBody')[0]
              .classList.add('sr-only') !== null &&
            e.currentTarget.parentElement.parentElement.classList.add('cursor-pointer')
          }
        >
          <div className='w-2 h-full transition-colors bg-gray-100 rounded-full group-hover:bg-gray-200 dark:bg-gray-900 dark:group-hover:bg-gray-700' />
        </button>
      </div>
      <div
        className='flex-1 ml-4'
        onClick={e =>
          e.currentTarget.parentElement.getElementsByClassName('commentBody')[0].classList.remove('sr-only') !== null &&
          e.currentTarget.parentElement.classList.remove('cursor-pointer')
        }
      >
        <div className='flex justify-between mb-2'>
          <div className='space-x-4 text-gray-600 dark:text-gray-400'>
            <span
              className={
                comment.distinguished
                  ? comment.distinguished === 'admin'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                  : comment.is_submitter
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'dark:text-gray-300'
              }
            >
              <SpecialLink href={`/u/${comment.author}`}>u/{comment.author}</SpecialLink>
            </span>
            <span title={dayjs.unix(comment.created_utc).toLocaleString()}>
              {dayjs.unix(comment.created_utc).fromNow()}
            </span>
            {comment.author_flair_text && (
              <span className='p-1 px-3 text-sm bg-gray-100 rounded-full dark:bg-gray-900'>
                {comment.author_flair_text}
              </span>
            )}
          </div>
          <div className='self-center'>
            {comment.stickied === true && (
              <div
                className='inline-block w-3 h-3 ml-1 bg-green-600 rounded-full dark:bg-green-400'
                title='Comment stickied'
              />
            )}
            {comment.edited === true && (
              <div
                className='inline-block w-3 h-3 ml-1 bg-yellow-600 rounded-full dark:bg-yellow-400'
                title='Comment edited'
              />
            )}
            {comment.gilded === true && (
              <div
                className='inline-block w-3 h-3 ml-1 bg-orange-600 rounded-full dark:bg-orange-400'
                title='Comment gilded'
              />
            )}
          </div>
        </div>
        <div className='commentBody'>
          <RenderedMarkdown source={comment.body} />
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
