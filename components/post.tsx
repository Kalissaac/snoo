import kFormatter from '@lib/numFormat'
import SpecialLink from '@components/link'
import { SkeletonLine } from './skeleton'
import PostInfo from './fragments/postInfo'
import PostBadges from './fragments/postBadges'
import PostBody from './fragments/postBody'

export default function Post({ postData }) {
  return (
    <div
      className='relative flex max-w-full p-5 my-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 bg-gray-50 dark:bg-darker-gray'
      id={postData.id}
    >
      {/* info container */}
      <div className='flex items-center justify-center h-full voting min-w-[2.5rem] text-gray-700 dark:text-gray-300'>
        {postData.score === 1 ? <p title='Score hidden'>•</p> : <p>{kFormatter(postData.score)}</p>}
      </div>
      <div className='flex-grow ml-4'>
        <div className='flex justify-between w-full mb-2'>
          <PostInfo post={postData} />
          <div className='self-center'>
            <PostBadges post={postData} />
          </div>
        </div>
        <h1 className='text-lg font-medium'>
          <SpecialLink href={postData.permalink} className='!hover:border-orange-500 after:absolute after:inset-0'>
            {postData.title}
          </SpecialLink>
        </h1>
        <PostBody post={postData} truncate />
      </div>
    </div>
  )
}

export function PostSkeleton(): JSX.Element {
  return (
    <div className='relative flex max-w-full p-5 my-6 overflow-hidden border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 bg-gray-50 dark:bg-darker-gray'>
      <div className='flex items-center justify-center h-full voting min-w-[2.5rem] text-gray-700 dark:text-gray-300'>
        <SkeletonLine className='w-8 mt-0.5' />
      </div>
      <div className='flex-grow ml-4'>
        <div className='flex justify-between w-full mb-2'>
          <div className='space-x-4 text-gray-600 dark:text-gray-300'>
            <SkeletonLine className='inline-block w-36' />
            <SkeletonLine className='inline-block w-28' />
            <SkeletonLine className='inline-block w-16' />
            <SkeletonLine className='inline-block w-24' />
          </div>
        </div>
        <SkeletonLine className='w-96' />
        <SkeletonLine className='w-full mt-4 h-80' />
      </div>
    </div>
  )
}
