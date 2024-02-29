import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchDataByGenre } from '@/store';
const { cn } = require('@nextui-org/react')
import { Select, SelectItem } from "@nextui-org/react";
import { findGenreById } from '@/utils/helpers';

export default function SelectGenre({ genres, type, pageNumber, onSend }) {

    const dispatch = useDispatch()

    const handleSelectionChange = (e) => {
        dispatch(fetchDataByGenre({ genre: e.target.value, type, pageNumber }))
        const id = parseInt(e.target.value)
        const genre = findGenreById(genres, id)
        onSend(genre.name);
    };

    return (
        <div className='w-full max-w-xs'  >
            <Select
                label="Categories"
                variant="bordered"
                className="max-w-xs "
                classNames={{
                    label: " dark:text-neutral-300",
                }}
                popoverProps={{
                    classNames: {
                        content: "dark:bg-secondaryDark border-[1px] border-neutral-50/5",
                    },
                }}

                onChange={handleSelectionChange}
            >
                {
                    genres.map((genre) => {
                        return <SelectItem key={genre.id} value={genre.id}
                            classNames={{

                                base: cn(
                                    "max-w-full ",
                                    "focus:!bg-pinkDark hover:!bg-pinkDark dark:focus:!bg-redDark dark:hover:!bg-redDark hover:rounded-b-lg  mt-1 pb-2 ",

                                ),
                                label: "w-full text-neutral-400 ",

                            }}
                        >{genre.name}</SelectItem>
                    })
                }
            </Select>
        </div>
    )
}

