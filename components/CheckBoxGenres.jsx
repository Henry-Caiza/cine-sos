import React from 'react'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { useDispatch } from 'react-redux';
import { fetchDataByGenre } from '@/store';
const { cn } = require('@nextui-org/react')
//import { getGenres } from '@/store'

export default function CheckBoxGenres({ genres, type }) {

  const dispatch = useDispatch()

  return (
    <div className='w-3/12 pl-8 '>
      <CheckboxGroup
        label="Categories"
        classNames={{
          base: "w-full",
          label: "text-neutral-50 text-lg pb-2",
          wrapper: "bg-secondaryDark p-4 pb-8 rounded-2xl "
        }}
        onValueChange={(e) => {
          const genreSelected = e[e.length - 1]
          dispatch(fetchDataByGenre({ genre: genreSelected, type, pageNumber: 5 }))
        }}

      >
        {
          genres.map((genre) => {
            return <Checkbox key={genre.id} value={genre.id}
              classNames={{
                base: cn(
                  "max-w-full pl-4 justify-between flex-row-reverse",
                  "border-b border-neutral-700 mt-0 pb-2 ",
                  "hover:border-pinkDark/50"
                ),
                label: "w-full text-neutral-400 ",

              }}
            >{genre.name}</Checkbox>
          })
        }

      </CheckboxGroup>

    </div>
  )
}

