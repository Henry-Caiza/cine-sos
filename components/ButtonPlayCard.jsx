
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { motion } from "framer-motion"

function ButtonPlayCard({ movieData, type_media }) {
    const router = useRouter()

    function handler(event) {
        event.stopPropagation();
        router.push(`/watch/${movieData.id}=${typeMedia}`)
    }
    let typeMedia = movieData?.media_type
    if (type_media) {
        typeMedia = type_media
    }

    return (
        <motion.button
            name='button play video'
            aria-label='button play video'
            onClick={handler}
            whileTap={{ scale: 0.8 }}>

            <AiFillPlayCircle
                size={30}
                className='cursor-pointer hover:-translate-y-1 transition'
            />

        </motion.button>


    )
}

export default ButtonPlayCard