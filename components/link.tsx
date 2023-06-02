import Link from 'next/link'

export default function SpecialLink({
  href,
  title,
  customClass
}: {
  href: string
  title: string
  customClass?: string
}): JSX.Element {
  return (
    <Link
      href={href}
      className={`border-dotted border-b border-transparent hover:border-gray-50 border-opacity-50 ${customClass}`}
    >
      {title}
    </Link>
  )
}
