import MediaPreview from '@components/media'
import { truncate as truncateString } from '@lib/utils'
import RenderedMarkdown from './renderedMarkdown'

export default function PostBody({
  post,
  className = '',
  truncate = false
}: {
  post: any
  className?: string
  truncate?: boolean
}): JSX.Element {
  return (
    <div className={`mt-4 ${className}`}>
      {post.selftext && <RenderedMarkdown source={truncate ? truncateString(post.selftext, 1000) : post.selftext} />}
      {!post.is_self && <MediaPreview post={post} />}
    </div>
  )
}
