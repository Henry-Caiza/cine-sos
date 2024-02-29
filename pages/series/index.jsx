import CardSlider from "@/components/CardSlider"
import CheckBoxGenres from "@/components/CheckBoxGenres"
import Header from "@/components/Header"
import LeftSlider from "@/components/LeftSlider"
import NotAvailable from "@/components/NotAvailable"
import SelectGenre from "@/components/SelectGenre"
import Slider from "@/components/Slider"
import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchAllMovies, fetchListSeries, fetchTrendingMovies, getGenres } from "@/store"
import { dataLeftSlider } from "@/utils/helpers"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


function SeriesPage() {
    const { data: user } = useCurrentUser()
    const genresLoaded = useSelector((state) => state.cinesos.genresLoaded)

    const movies = useSelector((state) => state.cinesos.movies)
    const genres = useSelector((state) => state.cinesos.genres)
    const listSeries = useSelector((state) => state.cinesos.listSeries)
    const seriesTrending = useSelector((state) => state.cinesos.moviesTrending)

    const [genreTaken, setGenreTaken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres({ type: 'tv' }))
    }, [])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchAllMovies({ type: 'tv', pageNumber: 4 }))
            dispatch(fetchTrendingMovies({ type: 'tv', pageNumber: 1 }))
            dispatch(fetchListSeries({ type: 'tv' }))
        }
    }, [genresLoaded])

    const handleDates = (data) => {
        setGenreTaken(data);
    };

    return (
        <>
            <Head>
                <title>Series | CINESOS</title>
                <meta name='Series' content='Series Page of CINESOS' />
                <meta name='description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Series | CINESOS' />
                <meta property='og:description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:url' content='https://cinesos.vercel.app/series/' />
                <meta property="og:site_name" content="CINESOS"></meta>
            </Head>
            <main className='pl-4 md:pl-40 lg:pl-48 h-full w-full bg-gradient-to-b from-pinkDark/50 via-light from-5% via-20% to-light dark:bg-dark dark:bg-gradient-to-b dark:from-pinkDark/50 dark:via-dark dark:from-5% dark:via-20% dark:to-dark'>
                <Header name={user?.name} type='tv' className='pr-4' />
                <div className='flex w-full pb-16'>
                    <div className='w-full rounded-2xl h-full relative mt-16 md:mt-4 pt-8 md:pt-20'>
                        <div className='flex flex-col gap-8 w-full '>
                            {
                                movies.length ? <>
                                    <LeftSlider dataLeftSlider={dataLeftSlider[4]} className='flex md:hidden h-28 w-full bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />
                                    <CardSlider data={seriesTrending?.slice(0, 10)} isWrap={true} haveLeftSlider={true} dataLeftSlider={dataLeftSlider[4]} title='' classNameCardSlider='-mt-8' type_media='tv' classNameLeftSlider='bg-radial-gradient-light-trending dark:bg-radial-gradient-dark-trending' />

                                    <CardSlider title={`On The Air Series and Docuseries`} data={listSeries.upcomingSeries} type_media='tv' isWrap={true} classNameCardSlider='-mt-6 -mb-2 md:mt-0 md:mb-0' />

                                    <Slider dataTopRated={listSeries.topSeries} dataPopular={listSeries.popularSeries} title='Series and Docuseries' isWrap={true} type_media='tv' classNameCard='md:w-80 md:h-[30rem]' classNameCardFooter='md:w-72' />
                                </> :
                                    <NotAvailable />
                            }
                        </div>
                        <div className="absolute -top-16 md:-top-4 right-4 flex gap-2 md:gap-4 w-full md:w-96 max-w-xs items-center">
                            <Link href='/series/all' className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 text-sm w-5/12 dark:hover:text-neutral-300 transition">
                                See all series
                            </Link>
                            <SelectGenre genres={genres} type='tv' pageNumber={5} onSend={handleDates} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SeriesPage