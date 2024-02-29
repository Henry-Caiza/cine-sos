
import { nextui } from "@nextui-org/react"

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fc6758",
          foreground: "#000000",
        },

        dark: '#141414',
        secondaryDark: '#1a1a1a',
        tercearyDark: '#0f0f0f',
        pinkDark: '#fc6758',
        redDark: '#bf133c',
        light: "#efefef",
        secondaryLight: '#dcdcdc',
      },
      backgroundImage: {
        'radial-gradient-dark-trending': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(20,20,20) 60%), url(https://i.imgur.com/86T8fZq.png)',
        'radial-gradient-light-trending': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(239,239,239) 60%), url(https://i.imgur.com/86T8fZq.png)',

        'radial-gradient-dark-magic': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(20,20,20) 60%), url(https://image.tmdb.org/t/p/w500/n5A7brJCjejceZmHyujwUTVgQNC.jpg)',
        'radial-gradient-light-magic': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(239,239,239) 60%), url(https://image.tmdb.org/t/p/w500/n5A7brJCjejceZmHyujwUTVgQNC.jpg)',

        'radial-gradient-dark-terror': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(20,20,20) 60%), url(https://image.tmdb.org/t/p/w500/5FrPZHgbbmTIq0oxpwSGqu5HyXC.jpg)',
        'radial-gradient-light-terror': 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(239,239,239) 60%), url(https://image.tmdb.org/t/p/w500/5FrPZHgbbmTIq0oxpwSGqu5HyXC.jpg)',
      },
      screens: {
        'tall': { 'raw': '(min-height: 1100px)' },
        'tv': '2500Px'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: "#141414",
        }
      },
      light: {
        colors: {
          background: "#efefef",
        }
      }
    },
    addCommonColors: true,
  })],
}
