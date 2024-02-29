import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" className=''>
      <Head>
        <title>CINESOS</title>
        <meta name='cinesos' content='CINESOS website of movies and series' />
      </Head>
      <body className=''>
        <Script id='theme-switcher' strategy='beforeInteractive'>
          {
            `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }`
          }
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
