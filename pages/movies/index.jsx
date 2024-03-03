
import Header from "@/components/Header"
import NotAvailable from "@/components/NotAvailable"
import SelectGenre from "@/components/SelectGenre"
import Slider from "@/components/Slider"
import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchAllMovies, fetchDatesUpcoming, fetchListCollection, fetchListMovies, fetchTrendingMovies, getGenres } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataLeftSlider, filterDates } from '@/utils/helpers'
import LeftSlider from "@/components/LeftSlider"
import CardSlider from "@/components/CardSlider"
import Head from "next/head"

function MoviesPage() {
    const { data: user } = useCurrentUser()
    const genresLoaded = useSelector((state) => state.cinesos.genresLoaded)
    const movies = useSelector((state) => state.cinesos.movies)
    const genres = useSelector((state) => state.cinesos.genres)
    const dispatch = useDispatch()
    const listMovies = useSelector((state) => state.cinesos.listMovies)
    const datesUpcoming = useSelector((state) => state.cinesos.datesUpcoming)
    const listCollection = useSelector((state) => state.cinesos.listCollection)
    const moviesTrending = useSelector((state) => state.cinesos.moviesTrending)
    const [genreTaken, setGenreTaken] = useState('')
    let moviesUpcoming = []

    useEffect(() => {
        dispatch(getGenres({ type: 'movie' }))
    }, [])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchAllMovies({ type: 'movie', pageNumber: 4 }))
            dispatch(fetchTrendingMovies({ type: 'movie', pageNumber: 1 }))
            dispatch(fetchListMovies({ type: 'movie' }))
            dispatch(fetchDatesUpcoming())
            dispatch(fetchListCollection({ type: 'movie' }))
        }
    }, [genresLoaded])

    try {
        moviesUpcoming = filterDates(listMovies?.upcomingMovies, datesUpcoming?.minimum, datesUpcoming?.maximum);
    } catch (error) {
    }

    //const moviesUpcoming = filterDates(listMovies.upcomingMovies, datesUpcoming.minimum, datesUpcoming.maximum)

    const handleDates = (data) => {
        setGenreTaken(data)
    }
    return (
        <>
            <Head>
                <title>Movies | CINESOS</title>
                <meta name='Movies' content='Movies Page of CINESOS' />
                <meta name='description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Movies |CINESOS' />
                <meta property='og:description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:url' content='https://cinesos.vercel.app/movies/' />
                <meta property="og:site_name" content="CINESOS"></meta>
            </Head>
            <main className='pl-4 md:pl-40 lg:pl-48 h-full w-full bg-gradient-to-b from-redDark/50 via-light from-5% via-20% to-light dark:bg-dark dark:bg-gradient-to-b dark:from-redDark/50 dark:via-dark dark:from-5% dark:via-20% dark:to-dark'>
                <Header name={user?.name} type='movie' className='pr-4 ' />
                <div className='flex w-full pb-14'>
                    <div className='w-full rounded-2xl h-full relative mt-16 md:mt-4 pt-8 md:pt-20'>
                        <div className='flex flex-col gap-8 w-full '>
                            {
                                movies.length ? <>
                                    <LeftSlider dataLeftSlider={dataLeftSlider[3]} className='flex md:hidden h-28 w-full bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />
                                    <CardSlider data={moviesTrending?.slice(0, 10)} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[3]} title='' classNameCardSlider='-mt-8' type_media='movie' classNameLeftSlider='bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />

                                    <CardSlider title={`Upcoming Movies`} data={moviesUpcoming} type_media='movie' isWrap={true} classNameCardSlider='-mt-6 -mb-2 md:mt-0 md:mb-0' />

                                    <LeftSlider dataLeftSlider={dataLeftSlider[2]} className='flex mt-4 md:hidden h-28 w-full bg-auto bg-center  bg-radial-gradient-light-terror dark:bg-radial-gradient-dark-terror' />
                                    <CardSlider data={listCollection.terrorWorldCollection} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[2]} title='' type_media='movie' classNameCardSlider=' mb-4 -mt-12 md:mt-0' classNameLeftSlider='bg-auto bg-center  bg-radial-gradient-light-terror dark:bg-radial-gradient-dark-terror' />

                                    <Slider dataTopRated={listMovies.topMovies} dataPopular={listMovies.popularMovies} title='Movies' isWrap={true} type_media='movie' classNameCard='md:w-80 md:h-[30rem]' classNameCardFooter='md:w-72' />

                                    <LeftSlider dataLeftSlider={dataLeftSlider[1]} className='flex mt-4 md:hidden h-28 w-full bg-radial-gradient-light-magic dark:bg-radial-gradient-dark-magic' />
                                    <CardSlider data={listCollection.magicWorldCollection} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[1]} title='' type_media='movie' classNameCardSlider=' mb-4 -mt-12 md:mt-0' classNameLeftSlider=' bg-radial-gradient-light-magic dark:bg-radial-gradient-dark-magic ' />

                                </> :
                                    <NotAvailable />
                            }
                        </div>
                        <div className="absolute -top-16 md:-top-4 right-4 flex gap-2 md:gap-4 w-full md:w-96 max-w-xs items-center">
                            <Link href='/movies/all' className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 text-sm w-5/12 dark:hover:text-neutral-300 transition">
                                See all movies
                            </Link>
                            <SelectGenre genres={genres} type='movie' pageNumber={5} onSend={handleDates} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}

export default MoviesPage
