import Link from 'next/link'
import { ReactNode } from 'react'

export default function SpecialLink({
  href,
  children,
  className
}: {
  href: string
  children: ReactNode
  className?: string
}): JSX.Element {
  return (
    <Link
      href={href}
      className={`border-dotted border-b border-transparent hover:border-gray-800 hover:dark:border-gray-50 border-opacity-50 ${className}`}
    >
      {children}
    </Link>
  )
}
