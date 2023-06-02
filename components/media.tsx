import SpecialLink from './link'

export default function MediaPreview({ post }): JSX.Element {
  if (isImage(post.url)) {
    return <img className='object-contain max-w-full mx-auto max-h-[36rem]' src={post.url} alt={post.title} />
  }

  if (isVideo(post.url)) {
    return (
      <video controls autoPlay className='max-w-full max-h-[36rem] mx-auto'>
        <source src={getProperVideoUrl(post)} type={getVideoMimeType(post.url)} />
      </video>
    )
  }

  if (isYouTube(post.url) !== null) {
    return (
      <iframe
        width='100%'
        height='762'
        src={'https://www.youtube-nocookie.com/embed/' + isYouTube(post.url)[1]}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
      />
    )
  }

  return (
    <SpecialLink href={post.url} className='text-sm text-orange-500'>
      {post.url}
    </SpecialLink>
  )
}

function isImage(url: string) {
  return url.match(/\b(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)$\b/i)
}

function isVideo(url: string) {
  return url.match(/(v.redd.it)|((mp4|gifv|m4v|mov|webm|3gp|ogg|mpeg)$)/i)
}

function isRedditVideo(url: string) {
  return url.match(/v.redd.it/i)
}

function getVideoMimeType(url: string) {
  if (isRedditVideo(url)) return 'video/mp4'
  let type = url.split('.').pop()
  if (type === 'gifv') type = 'mp4'
  return 'video/' + type
}

function getProperVideoUrl(post) {
  const url = post.url
  if (isRedditVideo(url)) {
    return post.media.reddit_video.fallback_url
  }
  const newUrl = url.split('.')
  let type = newUrl.pop() || ''
  if (type === 'gifv') type = 'mp4'
  newUrl.push(type)
  return newUrl.join('.')
}

function isYouTube(url: string) {
  return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
}
