import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { store } from '@/store'

export const metadata = {
  title: "ABASDSAD",
  description: "fafafasfafafafasfafasfasffsaf"
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name="description" content="Author: C.V. Henry, Category: Movies, Series, Videos" />
          <link rel='icon' href='/cinesos.ico' />

        </Head>
        <main className='h-full !bg-light !dark:bg-dark'>
          <Sidebar />
          <Component key={router.asPath} {...pageProps} />
        </main>
      </Provider>
    </>
  )
}
