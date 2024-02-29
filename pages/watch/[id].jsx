import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailsMovies, fetchDetailsSeries, fetchVideos } from '@/store'
import LoadingSpinner from '@/components/LoadingSpinner'
import ReactPlayer from 'react-player/youtube'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

const Watch = () => {
    const pathname = usePathname()
    const router = useRouter();
    const dispatch = useDispatch()
    const detailsMov = useSelector((state) => state.cinesos.detailsMovies)
    const detailsTv = useSelector((state) => state.cinesos.detailsSeries)

    const videos = useSelector((state) => state.cinesos.videos)
    let idMedia = ''
    let typeMedia = ''
    let idV = ''
    const [isLoading, setIsLoading] = useState(false);

    try {
        const arrPath = pathname?.split('/watch/')
        idV = arrPath[1]
        const newArr = idV?.split('=');
        idMedia = newArr[0]
        typeMedia = newArr[1]
    } catch (error) {
        console.log(error)
    }

    useEffect(() => {
        setIsLoading(true);
        typeMedia === 'movie' ?
            dispatch(fetchDetailsMovies({ id: idMedia }))
            : dispatch(fetchDetailsSeries({ id: idMedia }))
        dispatch(fetchVideos({ type: typeMedia, id: idMedia })).then(() => setIsLoading(false))
    }, [])

    return (
        <>
            <Head>
                <title>Watch {typeMedia === 'movie' ? detailsMov?.title : detailsTv?.name} | CINESOS</title>
                <meta name='Watch' content='Watch Page of CINESOS' />
            </Head>
            <main className="h-screen w-screen bg-black fixed aspect-video z-50">
                <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                    <HiOutlineArrowLeft onClick={() => router.back()} className="w-6 h-6 md:w-10 md:h-10 text-white cursor-pointer hover:opacity-80 transition" />
                    <p className="text-white text-1xl md:text-3xl font-bold">
                        <span className="font-light">Watching:</span> {typeMedia === 'movie' ? detailsMov?.title : detailsTv?.name}
                    </p>
                </nav>
                <LoadingSpinner isLoading={isLoading} />
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videos[0]?.key}?autoplay=1`}
                    controls={true}
                    width='100%'
                    height='100%'
                    playing={true}
                />
            </main>
        </>
    )

}

export default Watch;