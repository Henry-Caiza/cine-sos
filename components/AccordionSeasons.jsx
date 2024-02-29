import { IoMdTime } from "react-icons/io";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { fetchSeasons } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function AccordionSeasons({ idTv }) {
    const seasonsLoaded = useSelector((state) => state.cinesos.seasonsLoaded)
    let localSeasons = useSelector((state) => state.cinesos.seasons)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSeasons({ id: idTv }));
    }, [])

    return (
        <Accordion variant="splitted"
            itemClasses={
                {
                    base: 'bg-red dark:!bg-tercearyDark',
                    titleWrapper: 'flex flex-row items-center gap-2'
                }
            }
            className="w-full !px-0"
        >
            {
                localSeasons ? localSeasons.map((season, i) => {
                    if (i >= 0 && seasonsLoaded) {
                        return <AccordionItem key={i} aria-label={season.name} title={season.name} className='' subtitle={`${season.episodes.length} Episodes`}>
                            {
                                season.episodes.map((episode, j) => {
                                    return <div className='flex items-center gap-2 md:gap-8 border-t border-neutral-50/10 py-6' key={j}>
                                        <div className="hidden md:flex text-xl">
                                            {j < 9 ? <span>0{j + 1}</span> : <span>{j + 1}</span>}
                                        </div>
                                        <div className='flex items-center justify-between gap-4 w-full'>
                                            <img className="hidden md:flex rounded-md border-[1px] border-neutral-50/5 w-10 h-6 md:w-[11.5rem] md:h-[6.5rem]"
                                                src={episode.still_path ? `https://image.tmdb.org/t/p/w185${episode.still_path}` : 'https://i.imgur.com/4BJfpQv.png'}

                                            />
                                            <div className='flex flex-col gap-2 w-full self-start'>
                                                <div className=' flex items-center justify-between'>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex md:hidden text-xl ">
                                                            {j < 9 ? <span>0{j + 1}</span> : <span>{j + 1}</span>}
                                                        </div>
                                                        <h3 className='text-sm'>{episode.name}</h3>
                                                    </div>

                                                    <div className='bg-secondaryLight dark:bg-secondaryDark border-[1px] border-neutral-50/5 rounded-md py-1 px-2 flex gap-1 md:gap-2 '>
                                                        <IoMdTime />
                                                        <span className='text-xs'>{episode.runtime} min</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img className="flex float-left md:hidden rounded-md border-[1px] border-neutral-50/5 w-32 h-20 md:w-[11.5rem] md:h-[6.5rem] mr-2"
                                                        src={episode.still_path ? `https://image.tmdb.org/t/p/w185${episode.still_path}` : 'https://i.imgur.com/4BJfpQv.png'}

                                                    />
                                                    <p className='text-xs text-neutral-400 text-justify md:pl-0'>
                                                        {episode.overview}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </AccordionItem>
                    }
                }) : null
            }
        </Accordion>
    )
}

export default AccordionSeasons