export function isImage (url: String) {
  return url.match(/\b(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)$\b/i)
}

export function isVideo (url: String) {
  return url.match(/\b(mp4|gifv|m4v|mov|webm|3gp|ogg|mpeg)$\b/i)
}

export function getVideoMimeType (url: String) {
  let type = url.split('.').pop()
  if (type === 'gifv') type = 'mp4'
  return 'video/' + type
}

export function getProperVideoUrl (url: String) {
  const newUrl = url.split('.')
  let type = newUrl.pop() || ''
  if (type === 'gifv') type = 'mp4'
  newUrl.push(type)
  return newUrl.join('.')
}

export function isYouTube (url: String) {
  return url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
}