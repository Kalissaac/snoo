import { SWRInfiniteKeyLoader } from 'swr/infinite'

export async function getRedditPosts(subreddit: string = '') {
  if (subreddit === '') {
    const data = await fetch('https://reddit.com/.json')
    return await data.json()
  } else {
    const data = await fetch(`https://reddit.com/r/${subreddit}.json`)
    return await data.json()
  }
}

export async function getSubredditInfo(subreddit: string = '') {
  if (subreddit === '') {
    return {}
  } else {
    const data = await fetch(`https://reddit.com/r/${subreddit}/about.json`)
    return await data.json()
  }
}

export async function getPostComments(permalink: string = '') {
  if (permalink === '') {
    return {}
  } else {
    const data = await fetch(`https://reddit.com/${permalink}.json`)
    return await data.json()
  }
}

export function getKey(path: string): SWRInfiniteKeyLoader {
  return (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && (!previousPageData.data || !previousPageData.data.after)) return null

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return path

    // add the cursor to the API endpoint
    // TODO: proper query string handling (e.g. if the path already has a query string)
    return `/${path}?after=${previousPageData.data.after}`
  }
}

export function getKeyForSubredditPosts(subreddit?: string) {
  if (!subreddit) return getKey('/.json')
  return getKey(`/r/${subreddit}/.json`)
}

export function getKeyForUserActivity(user?: string) {
  if (!user) return getKey('/.json')
  return getKey(`/user/${user}/.json`)
}
