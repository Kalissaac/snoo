import '@styles/index.css'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import '@styles/nprogress.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

NProgress.configure({ showSpinner: false })

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

  return <Component {...pageProps} />
}

export default App
