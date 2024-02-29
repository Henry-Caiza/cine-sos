import React from 'react'
import { twMerge } from "tailwind-merge"

function LeftSlider({ dataLeftSlider, className }) {

    return (
        <div className={twMerge(
            `hidden md:flex md:w-[28rem] md:h-80 snap-always snap-start bg-cover bg-top `, className)}
        >
            <div className={`md:w-[28rem] h-full flex flex-col justify-center items-center md:items-start pl-2 dark:bg-dark/20`}>
                <h3 className='text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base '>{dataLeftSlider.titleH3}</h3>
                <h2 className='text-2xl md:text-4xl font-semibold text-black dark:text-white mb-2 md:mb-4'>{dataLeftSlider.titleH2}</h2>
                <p className='text-sm md:text-lg leading-5 text-neutral-950 dark:text-neutral-100'>{dataLeftSlider.description}</p>
            </div>

        </div>

    )
}

export default LeftSlider