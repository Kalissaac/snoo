import SpecialLink from '@components/link'
import kFormatter from '@lib/numFormat'
import dayjs from 'dayjs'
import { type HTMLAttributes } from 'react'

export default function PostInfo({
  post,
  className = '',
  children,
  ...props
}: { post: any } & HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={`space-x-4 text-gray-600 dark:text-gray-300 ${className}`} {...props}>
      <span>
        <SpecialLink href={`/${post.subreddit_name_prefixed}`} className='relative z-10'>
          {post.subreddit_name_prefixed}
        </SpecialLink>
      </span>
      <span
        className={
          post.distinguished
            ? post.distinguished === 'admin'
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
            : ''
        }
      >
        <SpecialLink href={`/u/${post.author}`} className='relative z-10'>
          u/{post.author}
        </SpecialLink>
      </span>
      <span title={dayjs.unix(post.created_utc).toLocaleString()}>{dayjs.unix(post.created_utc).fromNow()}</span>
      <span>
        {kFormatter(post.num_comments)} comment{post.num_comments !== 1 && 's'}
      </span>
      {children}
    </div>
  )
}
