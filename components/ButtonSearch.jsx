import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

function ButtonSearch({ type }) {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search?${type}=${searchValue}`)
    }

    return (
        <form action="" onSubmit={handleSearch} className='w-auto md:w-80 xl:w-2/3'>
            <div className='w-full relative group'>
                <RiSearchLine className='absolute left-3 md:left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-300 cursor-pointer transition' onClick={handleSearch} />
                <input
                    type="text"
                    name='input search'
                    className='dark:bg-dark/70 w-full py-2 pl-10 md:pl-14 pr-4 md:pr-6 text-dark dark:text-gray-200 rounded-full outline outline-2 outline-default-200  focus:outline-default-700  hover:outline-default-400  transition-all'
                    placeholder='Search for movies, series...'
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>
        </form>
    )
}

export default ButtonSearch