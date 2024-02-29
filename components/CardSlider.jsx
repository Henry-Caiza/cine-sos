
import React, { useRef, useState } from 'react'
import Card from './Card'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { twMerge } from "tailwind-merge"
import LeftSlider from './LeftSlider';


export default React.memo(
    function CardSlider({ title, data, type_media, list_liked, className, classNameCard, classNameCardSlider, isWrap, haveLeftSlider, dataLeftSlider, classNameLeftSlider, classNameCardFooter }) {
        const [scrollLeft, setScrollLeft] = useState(0)
        const refSlider = useRef(null)
        return (
            <section className={twMerge(
                '',
                classNameCardSlider
            )}>
                <h3 className='text-xl font-semibold mb-4 mt-8 text-neutral-700 dark:text-neutral-100'>{title}</h3>
                <div className='relative group/buttons w-full'>
                    <div
                        ref={refSlider}
                        className={twMerge(
                            `container-card flex gap-2 md:gap-4 transition-all  ${!list_liked ? 'overflow-x-auto overflow-y-hidden lg:overflow-x-hidden snap-mandatory snap-x scroll-smooth scroll-pl-6 w-full' : 'flex-wrap '}  `,
                            className
                        )} >
                        {
                            haveLeftSlider && <LeftSlider dataLeftSlider={dataLeftSlider} className={classNameLeftSlider} />
                        }
                        {
                            isWrap ?
                                <>
                                    {
                                        scrollLeft > 0 ? <button
                                            name='button arrow left'
                                            aria-label='button arrow left'
                                            onClick={() => {
                                                refSlider.current.scrollLeft -= refSlider.current.offsetWidth
                                                setScrollLeft(refSlider.current.scrollLeft)
                                            }}
                                            className='hidden md:flex absolute opacity-0 group-hover/buttons:opacity-100 transition-opacity left-0 h-full z-50 bg-gradient-to-r from-tercearyDark/30 dark:from-tercearyDark/90 to-transparent w-20 items-center justify-start pl-2 group/left'>
                                            <FaChevronLeft className='w-6 h-6 group-hover/left:scale-125 transition text-light' />
                                        </button>
                                            : null
                                    }

                                    <button
                                        name='button arrow right'
                                        aria-label='button arrow right'
                                        onClick={() => {
                                            refSlider.current.scrollLeft += refSlider.current.offsetWidth
                                            setScrollLeft(2)
                                        }}
                                        className='hidden md:flex absolute opacity-0 group-hover/buttons:opacity-100 transition-opacity right-0 h-full z-50 bg-gradient-to-l from-tercearyDark/30 dark:from-tercearyDark/90 to-transparent w-20 justify-end items-center pr-2 group/right'>
                                        <FaChevronRight className='w-6 h-6 group-hover/right:scale-125 transition text-light' />
                                    </button>
                                </>
                                : null
                        }
                        {
                            data && data.map((movie, index) => {
                                return <Card className={classNameCard} movieData={movie} index={index} key={movie.id} type_media={type_media} dataLeftSlider={dataLeftSlider} classNameCardFooter={classNameCardFooter} />
                            })
                        }
                    </div>
                </div>

            </section>
        )
    })

