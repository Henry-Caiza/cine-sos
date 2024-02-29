import CardSlider from "@/components/CardSlider"
import Header from "@/components/Header"

import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchAllMovies, fetchDataByGenre, getGenres } from "@/store"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@nextui-org/react"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useRouter } from "next/router"
import SelectGenre from "@/components/SelectGenre"
import { findGenreByName } from "@/utils/helpers"
import Head from "next/head"

function AllMoviesPage() {
    const { data: user } = useCurrentUser()
    const movies = useSelector((state) => state.cinesos.movies)
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const genres = useSelector((state) => state.cinesos.genres)
    const [genreTaken, setGenreTaken] = useState('')
    const genreName = findGenreByName(genres, genreTaken)

    useEffect(() => {
        dispatch(getGenres({ type: 'movie' }))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        genreTaken ?
            dispatch(fetchDataByGenre({ genre: genreName.id, type: 'movie', pageNumber: pageNumber })).then(() => setIsLoading(false))
            : dispatch(fetchAllMovies({ type: 'movie', pageNumber: pageNumber })).then(() => setIsLoading(false))
    }, [pageNumber])

    useEffect(() => {
        window.addEventListener('scroll', handlerScroll)
        return () => window.removeEventListener("scroll", handlerScroll);
    }, [])

    const handlerScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPageNumber((page) => page + 1)
        }
    }

    const handleDates = (data) => {
        setGenreTaken(data)
    }

    return (
        <>
            <Head>
                <title>All Movies | CINESOS</title>
                <meta name='All Movies' content='All Movies Page of CINESOS' />
                <meta name='description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='All Movies CINESOS' />
                <meta property='og:description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:url' content='https://cinesos.vercel.app/movies/all' />
                <meta property="og:site_name" content="CINESOS"></meta>
            </Head>
            <main className='pl-4 md:pl-40 lg:pl-48 h-full w-full bg-gradient-to-b from-redDark/50 via-light from-5% via-20% to-light dark:bg-dark dark:bg-gradient-to-b dark:from-redDark/50 dark:via-dark dark:from-5% dark:via-20% dark:to-dark'>
                <Header name={user?.name} type='movie' className='pr-4' />
                <div className=' relative mt-[4.5rem] md:mt-0 pr-4 pb-14'>
                    <CardSlider title={`${genreTaken} Movies`} data={movies} type_media='movie' list_liked={true}
                        classNameCardSlider='-mt-4 pt-2'
                        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                        classNameCard='w-auto h-auto'
                    />
                    <div className="absolute -top-8 md:top-4 right-4 flex gap-4 w-96 max-w-xs items-center">
                        <p onClick={() => router.back()} className=" text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 w-5/12 text-sm cursor-pointer dark:hover:text-neutral-300 transition flex gap-2 items-center ">
                            <HiOutlineArrowLeft className="w-4 h-4" />
                            Go back
                        </p>
                        <SelectGenre genres={genres} type='movie' pageNumber={pageNumber} onSend={handleDates} />
                    </div>
                </div>
                {isLoading && <CircularProgress aria-label="Loading..." className="mx-auto block" />}
            </main>
        </>
    )
}

export default AllMoviesPage