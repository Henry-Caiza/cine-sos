import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCredits, fetchDetailsSeries, fetchImages, fetchSimilarMovies, getGenres } from '@/store'

import { HiOutlineArrowLeft, HiOutlineShare } from "react-icons/hi2"

import { objDetails } from '@/utils/helpers'
import ButtonPlay from '@/components/ButtonPlayVideo'
import CardCast from '@/components/CardCast'
import Details from '@/components/Details'
import AccordionSeasons from '@/components/AccordionSeasons'
import ButtonFavorite from '@/components/ButtonFavorite'
import { Skeleton } from "@nextui-org/react";
import CardSlider from '@/components/CardSlider'
import { useRouter } from 'next/router'
import useCurrentUser from "@/hooks/useCurrentUser";
import ButtonShare from '@/components/ButtonShare'
import Head from 'next/head'
import { api } from '@/utils/constants'

function TvDetailPage({ pageMetadata }) {
    const { data: user } = useCurrentUser()
    const pathname = usePathname()
    const genresLoaded = useSelector((state) => state.cinesos.genresLoaded)
    const details = useSelector((state) => state.cinesos.detailsSeries)
    const credits = useSelector((state) => state.cinesos.credits)
    const images = useSelector((state) => state.cinesos.images)
    const similarSeries = useSelector((state) => state.cinesos.similarMovies)
    const router = useRouter()
    let idV = ''
    let logoFilePath = ''
    let imageNull = []
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    let movieDataC = {}

    useEffect(() => {
        dispatch(getGenres({ type: 'tv' }))
    }, [])

    try {
        const arrPath = pathname?.split('/tv/')
        idV = arrPath[1]
    } catch (error) {
        console.log(error);
    }


    useEffect(() => {
        try {
            if (genresLoaded) {
                setIsLoaded(false)
                dispatch(fetchSimilarMovies({ type: 'tv', pageNumber: 1, id: idV }))
                dispatch(fetchImages({ type: 'tv', id: idV })).then(() => setIsLoaded(true))
                dispatch(fetchDetailsSeries({ id: idV })).then(() => setIsLoaded(true))
                dispatch(fetchCredits({ type: 'tv', id: idV })).then(() => setIsLoaded(true))
            }
        } catch (error) {
            console.log(error);
        }

    }, [genresLoaded])

    function findImageNull(arr) {
        return arr.find(objeto => objeto.iso_639_1 === null);
    }

    const indexDirector = credits?.crew?.findIndex((credit) =>
        credit.job === 'Director'
    )
    movieDataC = objDetails(details, movieDataC, 'tv')


    try {
        imageNull = findImageNull(images?.posters)
        logoFilePath = images?.logos[0]?.file_path;
    } catch (error) {

    }

    const currentPageUrl = `https://cinesos.vercel.app/tv/${idV}`

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
            <main className='text-neutral-100 md:pl-36 lg:pl-44  w-full h-full pb-20 dark:bg-dark'>
                <section className='gap-8 w-full '>
                    <Skeleton isLoaded={isLoaded} >
                        <div className='w-full relative'>
                            <button
                                name='button back'
                                aria-label='button back'
                                onClick={() => router.back()} className='absolute top-4 left-4 bg-dark/20 p-2 rounded-full text-light'>
                                <HiOutlineArrowLeft className='w-6 h-6 md:w-10 md:h-10' />
                            </button>
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
                                className='hidden md:flex h-[65vh] md:h-[75vh] w-full object-cover object-top'
                            />
                            {
                                imageNull ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/w780${imageNull.file_path}`}
                                        className='md:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                    />
                                    : images?.posters[0]?.file_path ?
                                        <img
                                            src={`https://image.tmdb.org/t/p/w780${images?.posters[0]?.file_path}`}
                                            className='md:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                        />
                                        : <img
                                            src={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
                                            className='md:hidden h-[65vh] md:h-[75vh] w-full object-cover object-top'
                                        />
                            }
                            <ButtonPlay id={details.id} type='tv' />
                            <Skeleton isLoaded={isLoaded} className='z-50 absolute bottom-0 left-0 h-32  md:h-52 w-full'>
                                <div className=' bg-gradient-to-b from-transparent to-70% to-light dark:to-dark h-32  md:h-52 w-full flex items-end'>
                                    {
                                        logoFilePath ?
                                            <img src={`https://image.tmdb.org/t/p/w300${logoFilePath}`} alt="" className=' pl-4 h-32 w-4/5 object-contain  object-bottom md:w-auto md:h-auto md:max-h-32' />
                                            : <h2 className='pl-4 text-4xl md:text-7xl '>
                                                {details.name}
                                            </h2>
                                    }
                                </div>
                            </Skeleton>
                        </div>
                    </Skeleton>
                </section>
                <section className='p-4 gap-8 w-full flex flex-col md:flex-row'>
                    <div className='w-full md:w-9/12'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex gap-6 text-neutral-700 dark:text-neutral-100 text-sm md:text-base'>
                                <span>Seasons {details.number_of_seasons}</span>
                                <span>Episodes {details.number_of_episodes}</span>
                                <span>{details.first_air_date?.slice(0, 4)}</span>
                                <span>HD</span>
                            </div>
                            <div className='flex gap-2 text-neutral-700 dark:text-neutral-100'>
                                {
                                    user && <ButtonFavorite movieData={movieDataC} />
                                }
                                <ButtonShare currentPageUrl={currentPageUrl} title={details.name} />
                            </div>
                        </div>
                        <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-4'>
                            {details.overview}
                        </p>
                        <Skeleton isLoaded={isLoaded} className="rounded-xl">
                            <div className='bg-secondaryLight dark:bg-secondaryDark  border-[1px] border-neutral-50/5 rounded-xl py-4 px-4 md:px-6 mt-4 flex flex-col gap-4 text-neutral-700 dark:text-neutral-100'>
                                <h4 className='font-semibold '>Seasons and Episodes</h4>
                                <AccordionSeasons idTv={idV} seasonNumber={details.number_of_seasons} />
                            </div>
                        </Skeleton>
                        <div className=' bg-secondaryLight dark:bg-secondaryDark  border-[1px] border-neutral-50/5 rounded-xl py-4 px-6 mt-4 flex flex-col gap-4'>
                            <h4 className='font-semibold text-neutral-700 dark:text-neutral-100 '>Credits</h4>
                            <div className='relative'>
                                <h5 className='text-neutral-500 dark:text-neutral-400  text-sm mb-2'>Cast</h5>
                                <CardCast credits={credits} />
                            </div>
                        </div>
                    </div>
                    <Details details={details} type='tv' />
                </section>
                <CardSlider title={`More Like This`} data={similarSeries} type_media='tv' isWrap={true}
                    classNameCardSlider='-mt-6 pl-4 pb-20 md:pb-4'
                />
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    try {
        const { data: detailsMeta } = await api(`tv/${query.id}`);
        const pageMetadata = {
            title: `${detailsMeta.name} (${detailsMeta.first_air_date.slice(0, 4)}) | CINESOS`,
            description: detailsMeta.overview,
            url: `https://cinesos.vercel.app/tv/${query.id}`,
            titleOpen: detailsMeta.name,
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

export default TvDetailPage