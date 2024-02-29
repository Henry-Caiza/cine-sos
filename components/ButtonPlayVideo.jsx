import { useRouter } from 'next/router'
import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { motion } from "framer-motion"

function ButtonPlayVideo({ id, type }) {
    const router = useRouter()
    return (
        <motion.button
            name='button play video'
            aria-label='button play video'
            whileHover={{
                scale: 1.1,
                color: '#bf133c',
                transition: { duration: 0.4 },
            }}

            whileTap={{ scale: 0.8 }}
            className='absolute cursor-pointer left-[calc(50%-45px)] top-[calc(50%-42px)] flex flex-col items-center justify-center'
            onClick={() => router.push(`/watch/${id}=${type}`)}
        >
            <AiFillPlayCircle size={60} className='rounded-full ' />
            <p>Watch Trailer</p>
        </motion.button>
    )
}

export default ButtonPlayVideo