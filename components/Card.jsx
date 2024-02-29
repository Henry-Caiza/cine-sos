import React from 'react'
import { StarRating } from '@/utils/helpers'

import { usePathname } from 'next/navigation';
import { CiCalendar } from "react-icons/ci"
import ButtonFavorite from './ButtonFavorite';
import ButtonPlayCard from './ButtonPlayCard';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { twMerge } from "tailwind-merge"
import useCurrentUser from "@/hooks/useCurrentUser";

function formatoNumerico(numero) {
    if (numero >= 10) {
        return (numero / 10).toFixed(1) + 'k';
    } else {
        return numero.toString();
    }
}

export default React.memo(function Card({ movieData, isLiked = false, type_media, className, dataLeftSlider, index, classNameCardFooter }) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: user } = useCurrentUser()

    let movieDataC = { ...movieData }

    function rating(rate) {
        const average = rate * 5 / 10
        return average.toPrecision(2)
    }

    function handler(type_media, event) {
        event.stopPropagation();
        if (!type_media)
            router.push(`/${movieData.media_type}/${movieData.id}`)
        else
            router.push(`/${type_media}/${movieData.id}`)
    }

    if (!movieData.media_type)
        movieDataC.media_type = type_media

    return (
        <div
            className={twMerge(
                'h-60 w-44 md:w-auto md:h-auto bg-secondaryLight dark:bg-secondaryDark rounded-xl snap-always snap-start sm:rounded-2xl border border-neutral-500/10 p-2 md:p-3 flex flex-col gap-1 md:gap-2 relative group',
                className
            )}
        >
            {
                dataLeftSlider?.titleH2 === 'Trending now' && <div className=' h-4 w-8 md:h-5 cursor-pointer rounded-sm bg-pinkDark absolute top-0 left-0 md:-left-2 flex items-center justify-center z-30'>
                    <span className='text-white text-xs md:text-sm font-semibold'>#{index + 1}</span>
                </div>
            }

            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} className='rounded-lg sm:rounded-xl object-cover h-[90%] 2xl:h-[94%] md:group-hover:scale-105 transition-transform duration-500 '
            />
            <motion.div
                whileHover={{
                    opacity: 1,
                    transition: { duration: 0.5 },
                }}
                initial={{
                    opacity: 0
                }}
                className='absolute opacity-0 group-hover:opacity-100 w-full h-full group-hover:bg-gradient-to-t group-hover:from-redDark from-10% group-hover:to-black/10 to-80%  bottom-0 left-0 rounded-2xl transition duration-200 cursor-pointer' onClick={(event) => handler(type_media, event)}>
                <div
                    className='hidden md:flex absolute opacity-0 bottom-0 px-2 pb-4 flex-col -translate-y-[20%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-light'>
                    <h4 className='text-base font-bold'>{movieData.name} <span className='text-xs font-light'>{movieData.date}</span></h4>
                    <p className='text-xs font-light max-h-20 overflow-hidden'>{movieData.overview}</p>
                    <div className='w-full flex mt-2 gap-2'>
                        {
                            user && <ButtonFavorite movieData={movieDataC} />
                        }
                        <ButtonPlayCard movieData={movieData} type_media={type_media} />
                    </div>
                </div>
            </motion.div>

            <div className={twMerge(`flex justify-between items-center text-neutral-700 dark:text-neutral-400 gap-0.5 xl:gap-2 `, classNameCardFooter)}>
                {
                    pathname.includes('movies') || pathname.includes('series') ?
                        <div className='text-[9px] bg-light dark:bg-dark flex items-center xl:text-[10px] gap-1 py-1 px-2 rounded-full'>
                            <CiCalendar className='hidden sm:block w-3 h-3 xl:w-4 xl:h-4 ' />
                            <span>{movieData.date?.slice(0, 4)}</span>
                        </div> :
                        <div className='text-[9px] bg-light dark:bg-dark flex items-center xl:text-[10px] py-1 px-2 rounded-full'>
                            {
                                movieData.media_type ? movieData.media_type === 'movie' ? <span>Movie</span> :
                                    <span>Serie</span> : type_media === 'movie' ? <span>Movie</span> :
                                    <span>Serie</span>
                            }
                        </div>
                }
                <div className='text-[9px] bg-light dark:bg-dark flex items-center xk:text-[10px] py-1 px-2 rounded-full gap-1'>
                    <div className='flex'>
                        <StarRating rating={rating(movieData.vote_average)} />
                    </div>
                    <span>{formatoNumerico(movieData.popularity)}</span>
                </div>
            </div>
        </div>
    )
})
