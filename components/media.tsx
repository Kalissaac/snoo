export default function MediaPreview({ post }): JSX.Element {
  return (
    <>
      {isImage(post.url) && (
        <img className='object-contain max-w-full' style={{ maxHeight: '36rem' }} src={post.url} alt={post.title} />
      )}
      {isVideo(post.url) && (
        <video controls autoPlay className='w-64 h-64'>
          <source src={getProperVideoUrl(post.url)} type={getVideoMimeType(post.url)} />
        </video>
      )}
      {isYouTube(post.url) !== null && (
        <iframe
          width='100%'
          height='762'
          src={'https://www.youtube-nocookie.com/embed/' + isYouTube(post.url)[1]}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
        />
      )}
    </>
  )
}

function isImage(url: string) {
  return url.match(/\b(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)$\b/i)
}

function isVideo(url: string) {
  return url.match(/\b(mp4|gifv|m4v|mov|webm|3gp|ogg|mpeg)$\b/i)
}

function getVideoMimeType(url: string) {
  let type = url.split('.').pop()
  if (type === 'gifv') type = 'mp4'
  return 'video/' + type
}

function getProperVideoUrl(url: string) {
  const newUrl = url.split('.')
  let type = newUrl.pop() || ''
  if (type === 'gifv') type = 'mp4'
  newUrl.push(type)
  return newUrl.join('.')
}

function isYouTube(url: string) {
  return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
}
