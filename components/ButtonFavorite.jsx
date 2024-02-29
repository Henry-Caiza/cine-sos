import React, { useCallback, useMemo } from 'react'
import axios from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { motion } from "framer-motion"

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"

function ButtonFavorite({ movieData }) {

    const { mutate: mutateFavorites } = useFavorites()
    const { data: currentUser, mutate } = useCurrentUser()

    const isFavorite = useMemo(() => {
        const list = currentUser.favoriteMovies || []
        return list.some((movie => movie.id === movieData.id))
    }, [currentUser, movieData.id])

    const toggleFavorites = useCallback(async () => {
        let response
        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieData } })
        } else {
            response = await axios.post('/api/favorite', { movieData })
        }
        const updatedFavoriteIds = response.data.favoriteMovies

        mutate({
            ...currentUser,
            favoriteMovies: updatedFavoriteIds
        })
        mutateFavorites()
    }, [movieData.id, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? IoMdHeart : IoMdHeartEmpty;
    function handleFavoriteClick(event) {
        event.stopPropagation();
    }
    return (
        <motion.button
            name='button favorie'
            aria-label='button faborite'
            whileTap={{ scale: 0.8 }}
            onClick={handleFavoriteClick}>
            <Icon size={30}
                className='cursor-pointer hover:-translate-y-1 transition'
                onClick={toggleFavorites}
            />
        </motion.button>
    )

}

export default ButtonFavorite