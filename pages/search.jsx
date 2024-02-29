import CardSlider from "@/components/CardSlider"
import Header from "@/components/Header"

import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchSearch, getGenres } from "@/store"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@nextui-org/react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router"
import Head from "next/head"

function SearchPage() {
    const { data: user } = useCurrentUser()
    const movies = useSelector((state) => state.cinesos.movies)
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()


    const queryKeys = Object.keys(router.query)
    const queryValues = Object.values(router.query)
    const typeMedia = queryKeys[0]
    const query = queryValues[0]

    useEffect(() => {
        dispatch(getGenres({ type: typeMedia }))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchSearch({ type: typeMedia, pageNumber: pageNumber, query })).then(() => setIsLoading(false));
    }, [pageNumber])

    useEffect(() => {
        window.addEventListener('scroll', handlerScroll)
        return () => window.removeEventListener("scroll", handlerScroll);
    }, [])

    const handlerScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && movies.length >= 18) {
            setPageNumber((page) => page + 1)
        }
    }

    return (
        <>
            <Head>
                <title>Search | CINESOS</title>
                <meta name='Search' content='Search Page of CINESOS' />
            </Head>
            <main className={`pl-4 md:pl-40 lg:pl-48 h-full w-full bg-gradient-to-b dark:bg-gradient-to-b via-light from-5% via-20% dark:from-5% dark:via-20% to-light dark:bg-dark dark:via-dark dark:to-dark
         ${typeMedia === 'movie' ? 'from-redDark/50 dark:from-redDark/50' : ' from-pinkDark/50     dark:from-pinkDark/50'}`}>
                <Header name={user?.name} type={typeMedia} className='pr-4' />
                <div className="relative pr-4 ">
                    <CardSlider title={`For search ${query}`} data={movies} type_media={typeMedia} list_liked={true}
                        classNameCardSlider='-mt-4 pt-2'
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                        classNameCard='w-auto h-auto'
                    />
                    <p onClick={() => router.back()} className="text-neutral-500 hover:text-neutral-800 absolute top-10 right-4 pt-2 dark:text-neutral-400 text-sm cursor-pointer dark:hover:text-neutral-300 transition flex gap-2 items-center ">
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        Go back
                    </p>
                </div>
                {isLoading && <CircularProgress aria-label="Loading..." className="mx-auto block" />}
            </main>
        </>
    )

}

export default SearchPage