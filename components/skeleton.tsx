import { type HTMLAttributes } from 'react'

export function SkeletonLine({ className = '', ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={`h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse ${className}`} {...props} />
}
