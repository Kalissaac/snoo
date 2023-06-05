import SnuOwnd from '@lib/snuownd'
import { type HTMLAttributes, useMemo } from 'react'

export default function RenderedMarkdown({
  source,
  className = '',
  ...props
}: {
  source: string
} & HTMLAttributes<HTMLDivElement>): JSX.Element {
  const parser = useMemo(() => SnuOwnd.getParser(undefined, undefined, undefined, undefined), [])

  return (
    <div
      {...props}
      className={`prose text-gray-700 dark:text-gray-200 dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: parser.render(source) }}
    />
  )
}
