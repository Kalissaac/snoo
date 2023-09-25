import { type HTMLAttributes } from 'react'
import SpecialLink from './link'

export default function MediaPreview({ post, ...props }: { post: any } & HTMLAttributes<HTMLElement>): JSX.Element {
  if (isImage(post.url)) {
    return (
      <img
        className='object-contain max-w-full mx-auto max-h-[36rem]'
        src={post.url}
        alt={post.title}
        loading='lazy'
        {...props}
      />
    )
  }

  if (isVideo(post.url)) {
    return (
      <video controls autoPlay muted className='max-w-full max-h-[36rem] mx-auto relative' {...props}>
        <source src={getProperVideoUrl(post)} type={getVideoMimeType(post.url)} />
      </video>
    )
  }

  if (isYouTube(post.url) !== null) {
    const videoId = isYouTube(post.url)[1]
    return (
      <iframe
        width='100%'
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1"><img src=https://img.youtube.com/vi/${videoId}/hqdefault.jpg><span>▶</span></a>`}
        className='relative z-10 border-0 aspect-video'
        allow='autoplay; encrypted-media; picture-in-picture'
        allowFullScreen
        {...props}
      />
    )
  }

  return (
    <SpecialLink href={post.url} className='relative text-sm text-orange-500'>
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
    return post.media?.reddit_video.fallback_url
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
