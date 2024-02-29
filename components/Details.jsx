import { StarRating, rating } from '@/utils/helpers'
import React from 'react'
import { AiOutlineAppstore } from 'react-icons/ai'
import { CiCalendar, CiStar } from 'react-icons/ci'
import { HiLanguage } from 'react-icons/hi2'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default React.memo(function Details({ details, type }) {
    const router = useRouter()

    function handler(genre) {
        type === 'movie' ? router.push(`/movies/${genre.name}=${genre.id}`) : router.push(`/series/${genre.name}=${genre.id}`)
    }

    return (
        <section className='w-full md:w-3/12 relative'>
            <div className={`bg-light dark:bg-secondaryDark outline outline-1 outline-neutral-50/5 rounded-xl p-6 flex flex-col gap-4 z-50 bg-cover bg-no-repeat md:bg-center`}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w780${details.poster_path})`,
                    '@media (min-width: 768px)': {
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w300${details.backdrop_path})`,
                    }
                }}>
                <div className='hidden md:block'>
                    <p className='flex items-center gap-2 text-neutral-300 text-sm mb-2'><CiCalendar size={20} />Released </p>
                    {
                        type === 'movie' ? <p className='text-sm'>{details.release_date}</p>
                            : <p className='text-sm'>{details.first_air_date}</p>
                    }
                </div>
                <div className='hidden md:block'>
                    <p className='flex items-center gap-2 text-neutral-300 mb-2 text-sm'><HiLanguage size={20} />Available Languages</p>
                    <div className='flex flex-wrap gap-2'>
                        {
                            details.spoken_languages?.map((item, i) => (
                                <span className='bg-dark/70 py-1 px-2 text-xs mr-4 border-[1px] border-neutral-50/10 rounded-md' key={i}>{item.english_name}</span>
                            ))
                        }
                    </div>
                </div>
                <div className='hidden md:block'>
                    <p className='flex items-center gap-2 text-neutral-300 mb-2 text-sm'><CiStar size={20} />Rating</p>
                    <div className=' bg-dark/70 p-2 border-[1px] border-neutral-50/10 rounded-md'>
                        <span>TMDB</span>
                        <div id='starContainer' className='flex flex-wrap gap-1 items-center'>
                            <StarRating rating={rating(details?.vote_average)} />

                            <span className='text-sm'>
                                {
                                    rating(details?.vote_average)
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='flex items-center gap-2 text-neutral-300 mb-2 text-sm'><AiOutlineAppstore size={20} />Genres</p>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        {
                            details.genres?.map((genre, i) => (
                                <motion.button
                                    name={`button genre ${genre.name}`}
                                    aria-label={`button genre ${genre.name}`}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: '#141414',
                                        color: '#fc6758',
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{ scale: 0.8 }}
                                    className='bg-pinkDark/70 py-1 px-2 text-xs mr-4 border-[1px] border-neutral-50/10 rounded-md'
                                    key={i}
                                    onClick={() => handler(genre)}
                                >
                                    {genre.name}
                                </motion.button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}
)