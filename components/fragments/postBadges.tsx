export default function PostBadges({ post }: { post: any }): JSX.Element {
  return (
    <>
      {post.stickied === true && (
        <div className='inline-block w-3 h-3 ml-1 bg-green-600 rounded-full dark:bg-green-400' title='Post stickied' />
      )}
      {post.locked === true && (
        <div className='inline-block w-3 h-3 ml-1 bg-yellow-600 rounded-full dark:bg-yellow-400' title='Post locked' />
      )}
      {post.archived === true && (
        <div
          className='inline-block w-3 h-3 ml-1 bg-orange-600 rounded-full dark:bg-orange-400'
          title='Post archived'
        />
      )}
    </>
  )
}
