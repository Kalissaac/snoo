import '@styles/index.css'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import '@styles/nprogress.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

NProgress.configure({ showSpinner: false })

dayjs.extend(relativeTime)

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const startLoader = (): void => {
      NProgress.start()
    }
    const stopLoader = (): void => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', startLoader)
    router.events.on('routeChangeComplete', stopLoader)
    router.events.on('routeChangeError', stopLoader)

    return () => {
      router.events.off('routeChangeStart', startLoader)
      router.events.off('routeChangeComplete', stopLoader)
      router.events.off('routeChangeError', stopLoader)
    }
  }, [])

  return (
    <SWRConfig
      value={{
        fetcher: (resource: string, init) =>
          fetch(resource.startsWith('/') ? `https://www.reddit.com${resource}` : resource, init).then(res => res.json())
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
