export async function getRedditPosts (subreddit: String = '') {
  if (subreddit === '') {
    const data = await fetch('https://reddit.com/.json')
    return await data.json()
  } else {
    const data = await fetch(`https://reddit.com/r/${subreddit}.json`)
    return await data.json()
  }
}

export async function getSubredditInfo (subreddit: String = '') {
  if (subreddit === '') {
    return {}
  } else {
    const data = await fetch(`https://reddit.com/r/${subreddit}/about.json`)
    return await data.json()
  }
}

export async function getPostComments (permalink: String = '') {
  if (permalink === '') {
    return {}
  } else {
    const data = await fetch(`https://reddit.com/${permalink}.json`)
    return await data.json()
  }
}