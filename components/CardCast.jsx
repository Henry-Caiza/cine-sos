import React, { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function CardCast({ credits }) {
    const refSliderCast = useRef(null)
    return (
        <div
            ref={refSliderCast}
            className='flex gap-4 overflow-hidden container-card pb-2  snap-mandatory snap-x scroll-smooth'>
            <div className='absolute right-0 -top-2 bg-dark border-[1px] border-neutral-50/10 flex gap-4 rounded-full px-3 py-1.5'>
                <button
                    name='button arrow left'
                    aria-label='button arrow left'
                    onClick={() =>
                        refSliderCast.current.scrollLeft -= refSliderCast.current.offsetWidth
                    }
                    className=''>
                    <FaChevronLeft className='w-2.5 h-2.5 ' />
                </button>
                <button
                    name='button arrow right'
                    aria-label='button arrow right'
                    onClick={() => {
                        refSliderCast.current.scrollLeft += refSliderCast.current.offsetWidth
                    }}
                    className=''>
                    <FaChevronRight className='w-2.5 h-2.5' />
                </button>
            </div>

            {credits?.cast?.map((person) => (
                person.profile_path ?
                    <img key={person.name} src={`https://image.tmdb.org/t/p/w92${person.profile_path}`} alt={person.name} title={person.name} className='rounded-lg w-20 h-24 object-cover object-top  snap-always snap-start' />

                    : null
            ))}
        </div>
    )
}

export default CardCast