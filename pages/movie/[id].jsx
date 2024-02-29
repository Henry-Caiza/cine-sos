import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCredits, fetchDetailsMovies, fetchImages, fetchSimilarMovies, getGenres } from '@/store'
import ButtonFavorite from '@/components/ButtonFavorite'
import useCurrentUser from "@/hooks/useCurrentUser"
import { HiOutlineArrowLeft } from "react-icons/hi"

import { hoursDuration, minutesDuration, objDetails } from '@/utils/helpers'
import Details from '@/components/Details'

import CardCast from '@/components/CardCast'
import ButtonPlay from '@/components/ButtonPlayVideo'
import { Skeleton } from "@nextui-org/react"
import CardSlider from '@/components/CardSlider'
import { useRouter } from "next/router"
import ButtonShare from '@/components/ButtonShare'
import { api } from '@/utils/constants'


function MovieDetailPage({ pageMetadata }) {
    const pathname = usePathname()
    const genresLoaded = useSelector((state) => state.cinesos.genresLoaded)
    const details = useSelector((state) => state.cinesos.detailsMovies)
    const credits = useSelector((state) => state.cinesos.credits)
    const images = useSelector((state) => state.cinesos.images)
    const similarMovies = useSelector((state) => state.cinesos.similarMovies)
    const router = useRouter()
    const { data: user } = useCurrentUser()

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let movieDataC = {}
    let imageNull = []
    let logoFilePath = ''
    let directorPath = ''
    let directorName = ''
    let idV = ''
    let currentPageUrl = ''

    useEffect(() => {
        dispatch(getGenres({ type: 'movie' }))
    }, [])

    try {
        const arrPath = pathname?.split('/movie/')
        idV = arrPath[1]
        imageNull = findImageNull(images?.posters)
        logoFilePath = images?.logos[0]?.file_path
        let indexDirector = credits.crew.findIndex((credit) =>
            credit.job === 'Director'
        )
        directorPath = credits?.crew[indexDirector]?.profile_path
        directorName = credits.crew[indexDirector].name
        currentPageUrl = `https://cinesos.vercel.app/movie/${idV}`
        titleMovie = details.title
        overviewMovie = details.overview
    } catch (error) {
        console.log(error);
    }

    useEffect(() => {
        if (genresLoaded) {
            setIsLoaded(false)
            dispatch(fetchSimilarMovies({ type: 'movie', pageNumber: 1, id: idV }))
            dispatch(fetchImages({ type: 'movie', id: idV })).then(() => setIsLoaded(true))
            dispatch(fetchDetailsMovies({ id: idV })).then(() => setIsLoaded(true))
            dispatch(fetchCredits({ type: 'movie', id: idV })).then(() => setIsLoaded(true))
        }
    }, [genresLoaded])

    movieDataC = objDetails(details, movieDataC, 'movie')

    function findImageNull(arr) {
        return arr.find(objeto => objeto.iso_639_1 === null);
    }

    return (
        <>
            <Head>
                <title>{pageMetadata.title}</title>
                <meta property='og:type' content='website' />
                <meta property='og:title' content={pageMetadata.title} />
                <meta property='og:description' content={pageMetadata.description} />
                <meta property='og:url' content={pageMetadata.url} />
                <meta property='og:image' content={pageMetadata.urlImagen} />
                <meta property='og:image:width' content='828' />
                <meta property='og:image:height' content='450' />
            </Head>
            <main className='text-neutral-100 md:pl-36 lg:pl-44 w-full h-full dark:bg-dark'>
                <section className='gap-8 w-full '>
                    <Skeleton isLoaded={isLoaded} >
                        <div className='w-full relative'>
                            <button
                                name='button back'
                                aria-label='button back'
                                onClick={() => router.back()}
                                className='absolute top-4 left-4 bg-dark/20 p-2 rounded-full text-light'>
                                <HiOutlineArrowLeft className='w-6 h-6 md:w-10 md:h-10' />
                            </button>
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
                                className='hidden sm:flex h-[65vh] md:h-[75vh] w-full object-cover object-top'
                            />
                            {
                                imageNull ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/w780${imageNull.file_path}`}
                                        className='sm:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                    />
                                    : images?.posters[0]?.file_path ?
                                        <img
                                            src={`https://image.tmdb.org/t/p/w780${images?.posters[0]?.file_path}`}
                                            className='sm:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                        />
                                        : <img
                                            src={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
                                            className='sm:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                        />
                            }
                            <ButtonPlay id={details.id} type='movie' />
                            <Skeleton isLoaded={isLoaded} className='z-50 absolute bottom-0 left-0 h-32  md:h-52 w-full'>
                                <div className=' bg-gradient-to-b from-transparent to-70% to-light dark:to-dark h-32  md:h-52 w-full flex items-end'>
                                    {
                                        logoFilePath ?
                                            <img src={`https://image.tmdb.org/t/p/w300${logoFilePath}`} alt="" className=' pl-4 h-32 w-4/5 object-contain  object-bottom md:w-auto md:h-auto md:max-h-32' />
                                            : <h2 className='pl-4 text-4xl md:text-7xl '>
                                                {details.title}
                                            </h2>
                                    }
                                </div>
                            </Skeleton>
                        </div>
                    </Skeleton>
                </section>
                <section className='p-4 gap-8 md:gap-4 w-full flex flex-col md:flex-row'>
                    <div className='w-full md:w-9/12'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex gap-6 text-neutral-700 dark:text-neutral-100'>
                                <span>{hoursDuration(details.runtime)}h {minutesDuration(details.runtime)}m</span>
                                <span>{details.release_date?.slice(0, 4)}</span>
                                <span>HD</span>
                            </div>
                            <div className='flex gap-2 text-neutral-700 dark:text-neutral-100'>
                                {
                                    user && <ButtonFavorite movieData={movieDataC} />
                                }
                                <ButtonShare currentPageUrl={currentPageUrl} title={details.title} />
                            </div>
                        </div>
                        <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-4'>
                            {details.overview}
                        </p>
                        <div className=' bg-secondaryLight dark:bg-secondaryDark border-[1px] border-neutral-50/5 rounded-xl py-4 px-6 mt-4 flex flex-col gap-4'>
                            <h4 className='font-semibold text-neutral-700 dark:text-neutral-100'>Credits</h4>
                            <div>
                                <h5 className='text-neutral-500 dark:text-neutral-400 text-sm mb-2'>Director</h5>
                                {
                                    directorPath ? <img src={`https://image.tmdb.org/t/p/w92${directorPath}`} alt={directorName} title={directorName} className='rounded-lg w-20 h-24 object-cover object-top' /> :
                                        <p>
                                            {directorName}
                                        </p>
                                }
                            </div>
                            <div className='relative'>
                                <h5 className='text-neutral-500 dark:text-neutral-400 text-sm mb-2'>Cast</h5>
                                <CardCast credits={credits} />
                            </div>
                        </div>
                    </div>
                    <Details details={details} type='movie' />
                </section>
                <CardSlider title={`More Like This`} data={similarMovies} type_media='movie' isWrap={true}
                    classNameCardSlider='-mt-6 pl-4 pb-20 md:pb-4'
                />
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    try {
        const { data: detailsMeta } = await api(`movie/${query.id}`);
        const pageMetadata = {
            title: `${detailsMeta.title} (${detailsMeta.release_date.slice(0, 4)}) | CINESOS`,
            description: detailsMeta.overview,
            url: `https://cinesos.vercel.app/movie/${query.id}`,
            titleOpen: detailsMeta.title,
            urlImagen: `https://image.tmdb.org/t/p/w780${detailsMeta.backdrop_path}`,
        };
        return {
            props: {
                detailsMeta,
                pageMetadata
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                error: 'Failed to fetch data',
            },
        };
    }
}

export default MovieDetailPage