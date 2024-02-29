import CardSlider from "@/components/CardSlider"
import Header from "@/components/Header"

import useCurrentUser from '@/hooks/useCurrentUser'
import { fetchDataByGenre, getGenres } from "@/store"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@nextui-org/react";
import { usePathname } from "next/navigation"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router"
import Head from "next/head"

function GenreSeriePage() {
    const { data: user } = useCurrentUser()
    const series = useSelector((state) => state.cinesos.movies)
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const pathname = usePathname()
    const router = useRouter()
    let idV = ''
    let nameGenre = ''
    let idGenre = ''
    let newArr = ''

    try {
        const arrPath = pathname?.split('/series/')
        idV = arrPath[1]

        newArr = idV?.split('=');
        function decodeText(text) {
            return decodeURIComponent(text.replace(/\+/g, ' '));
        }

        nameGenre = decodeText(newArr[0])
        idGenre = newArr[1]
    } catch (error) {
        console.log(error);
    }

    useEffect(() => {
        dispatch(getGenres({ type: 'tv' }))
    }, [])

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchDataByGenre({ genre: idGenre, type: 'tv', pageNumber: pageNumber })).then(() => setIsLoading(false));
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

    return (
        <>
            <Head>
                <title>{nameGenre} | CINESOS</title>
                <meta name='Genre' content={`${nameGenre} Page of CINESOS`} />
                <meta name='description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Genre | CINESOS' />
                <meta property='og:description' content="Your ultimate cinematic destination! Immerse yourself in the world of entertainment with MOVSOS, where you'll find a wide selection of movies and series for every taste. From timeless classics to the latest releases, MOVSOS takes you on an exciting journey through the big and small screen." />
                <meta property="og:site_name" content="CINESOS"></meta>
            </Head>
            <main className='pl-4 md:pl-40 lg:pl-48 h-full w-full bg-gradient-to-b from-pinkDark/50 via-light from-5% via-20% to-light dark:bg-dark dark:bg-gradient-to-b dark:from-pinkDark/50 dark:via-dark dark:from-5% dark:via-20% dark:to-dark'>
                <Header name={user?.name} type='tv' className='pr-4' />
                <div className="relative pr-4">
                    <CardSlider title={`${nameGenre} Series`} data={series} type_media='tv' list_liked={true}
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

export default GenreSeriePage