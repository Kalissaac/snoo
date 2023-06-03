import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'

export default function SpecialLink({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
} & ComponentProps<typeof Link>): JSX.Element {
  return (
    <Link
      {...props}
      className={`border-dotted border-b border-transparent hover:border-gray-800 hover:dark:border-gray-50 border-opacity-50 ${className}`}
    >
      {children}
    </Link>
  )
}
