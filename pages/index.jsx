
import Header from '@/components/Header'
import Head from 'next/head'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import "react-image-gallery/styles/css/image-gallery.css"
import { fetchAllMovies, fetchDatesUpcoming, fetchListCollection, fetchListMovies, fetchListSeries, fetchTrendingMovies, getGenres } from '@/store'
import Slider from '@/components/Slider'
import { Skeleton } from '@nextui-org/react'
import { createArrImagesMedia, dataLeftSlider, filterDates } from '@/utils/helpers'
import CardSlider from '@/components/CardSlider'
import LeftSlider from '@/components/LeftSlider'
import ImageGalleryContent from '@/components/ImageGalleryContent'


function Home() {
  const { data: user } = useCurrentUser()
  const genresLoaded = useSelector((state) => state.cinesos.genresLoaded)
  const movies = useSelector((state) => state.cinesos.movies)
  const listMovies = useSelector((state) => state.cinesos.listMovies)
  const datesUpcoming = useSelector((state) => state.cinesos.datesUpcoming)
  const listSeries = useSelector((state) => state.cinesos.listSeries)
  const listCollection = useSelector((state) => state.cinesos.listCollection)
  const moviesTrending = useSelector((state) => state.cinesos.moviesTrending)

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  let images = []
  let moviesUpcoming = []

  useEffect(() => {
    dispatch(getGenres({ type: 'movie' }))
  }, [])

  useEffect(() => {
    try {
      if (genresLoaded && movies) {
        setIsLoaded(false)
        dispatch(fetchAllMovies({ type: 'all', pageNumber: 1 })).then(() => setIsLoaded(true))
        dispatch(fetchTrendingMovies({ type: 'all', pageNumber: 1 })).then(() => setIsLoaded(true))
        dispatch(fetchListMovies({ type: 'movie' }))
        dispatch(fetchDatesUpcoming())
        dispatch(fetchListSeries({ type: 'tv' }))
        dispatch(fetchListCollection({ type: 'movie' }))
      }
    } catch (error) {
    }
  }, [genresLoaded])

  try {
    images = createArrImagesMedia(movies)
    moviesUpcoming = filterDates(listMovies?.upcomingMovies, datesUpcoming?.minimum, datesUpcoming?.maximum)
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <Head>
        <title>Home | CINESOS</title>
        <meta name='Home' content='Home Page of CINESOS' />
        <meta name='description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='CINESOS' />
        <meta property='og:description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
        <meta property='og:url' content='https://cinesos.vercel.app/' />
        <meta property="og:site_name" content="CINESOS"></meta>
      </Head>
      <main className=' h-full w-full relative'>
        <Header name={user?.name} className='absolute top-0 px-4 md:pl-40 lg:pl-48 sm:pr-8 z-40 w-full bg-gradient-to-b from-black/80 py-8' type='movie' />
        <div className='flex w-full pb-16 dark:bg-dark'>
          <div className='w-full rounded-2xl h-full '>
            <div className='w-full md:pl-36 lg:pl-44 relative'>
              {(movies === undefined || movies.length === 0) && (
                <Skeleton isLoaded={isLoaded}>
                  <ImageGalleryContent images={images} />
                </Skeleton>
              )}
              {movies !== undefined && movies.length > 0 && (
                <ImageGalleryContent images={images} />
              )}
              <div className='md:hidden absolute bottom-0 h-20 w-full bg-gradient-to-b from-transparent to-light dark:to-dark'></div>
            </div>
            <div className='pl-4 pr-0 md:pl-40 lg:pl-48 md:pr-2 flex pt-8 flex-col gap-4 md:gap-8 w-full'>
              <LeftSlider dataLeftSlider={dataLeftSlider[0]} className='flex md:hidden h-28 w-full bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />
              <CardSlider data={moviesTrending?.slice(0, 10)} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[0]} title='' classNameCardSlider='mb-4 -mt-6 md:mt-0' classNameLeftSlider='bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />

              <Slider dataUpcoming={moviesUpcoming} dataTopRated={listMovies.topMovies} dataPopular={listMovies.popularMovies} title='Movies' isWrap={true} type_media='movie' classNameCard='md:w-80 md:h-[30rem]' classNameCardFooter='md:w-72' />

              <LeftSlider dataLeftSlider={dataLeftSlider[1]} className='flex mt-4 md:hidden h-28 w-full bg-radial-gradient-light-magic dark:bg-radial-gradient-dark-magic' />
              <CardSlider data={listCollection.magicWorldCollection} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[1]} title='' type_media='movie' classNameCardSlider=' mb-4 -mt-6 md:mt-0' classNameLeftSlider='bg-radial-gradient-light-magic dark:bg-radial-gradient-dark-magic' />

              <Slider dataUpcoming={listSeries.upcomingSeries} dataTopRated={listSeries.topSeries} dataPopular={listSeries.popularSeries} title='Series and Docuseries' isWrap={true} type_media='tv' classNameCard='md:w-80 md:h-[30rem]' classNameCardFooter='md:w-72' />
            </div>
          </div>
        </div>
      </main>
    </>
  )


}

export default Home