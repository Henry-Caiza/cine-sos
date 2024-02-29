import Link from "next/link"
import { GoHome } from 'react-icons/go'
import { BiCameraMovie } from "react-icons/bi";
import { IoLogOutOutline } from 'react-icons/io5'
import { PiMonitorPlay } from "react-icons/pi";
import { RiPlayList2Line } from "react-icons/ri";
import { signOut } from 'next-auth/react'
import { useRouter } from "next/router"
import useCurrentUser from "@/hooks/useCurrentUser";
import cinesosIco from '@/public/cinesos.ico'

function Sidebar() {
    const router = useRouter()
    const { data: user } = useCurrentUser()

    return (
        <aside className="py-4 px-6 md:py-0 md:px-0  md:h-full w-full md:w-36 lg:w-44 tv:w-72 fixed bottom-0 bg-secondaryLight dark:bg-secondaryDark rounded-t-2xl md:rounded-tl-none md:rounded-r-2xl flex flex-col justify-between z-50">
            <div className="w-full">
                <ul className="flex flex-row justify-between items-center md:justify-normal md:flex-col w-full">
                    <li className="hidden w-full md:flex text-pinkDark md:px-2 py-8 lg:px-6 lg:py-10 items-center justify-center">
                        <Link aria-label="Logo Go to home page" href='/' className="text-4xl tv:text-5xl font-semibold flex items-center justify-center">
                            <p>Cine</p>
                            <img src={cinesosIco.src} alt="" className="w-12 h-12" />
                        </Link>
                    </li>
                    <li className={`${router.asPath === '/' ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'}  md:w-full hover:text-pinkDark md:hover:bg-pinkDark/20 relative group cursor-pointer transition-colors`}>
                        <Link aria-label="Go to home page" href='/' className="flex items-center gap-2 sm:text-sm md:text-lg tv:text-2xl md:p-6 lg:p-8 tv:px-12 tv:py-10">
                            <GoHome className='text-2xl tv:text-4xl' />
                            <span className="hidden sm:block">Home</span>
                        </Link>
                        <span className={`hidden md:inline-block w-[5px]  bg-pinkDark absolute right-0 bottom-[20%] group-hover:h-3/5 transition-[height] ease duration-300 ${router.asPath === '/' ? 'h-3/5 ' : 'h-0'}`}></span>
                    </li>
                    <li className={`${router.asPath.includes('movie') ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'} md:w-full hover:text-pinkDark dark:hover:text-pinkDark md:hover:bg-pinkDark/20  relative group cursor-pointer transition-colors`}>
                        <Link aria-label="Go to movies page" href='/movies' className="flex items-center gap-2 sm:text-sm md:text-lg tv:text-2xl md:p-6 lg:p-8 tv:px-12 tv:py-10">
                            <BiCameraMovie className='text-2xl tv:text-4xl' />
                            <span className="hidden sm:block">
                                Movies
                            </span>
                        </Link>
                        <span className={`w-[5px] hidden md:inline-block  bg-pinkDark absolute right-0 bottom-[20%] transition-[height] ease duration-300 group-hover:h-3/5  ${router.asPath.includes('movie') ? 'h-3/5 ' : 'h-0'}`}></span>
                    </li>
                    <li className={`${router.asPath.includes('/series') || router.asPath.includes('tv') ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'} md:w-full hover:text-pinkDark dark:hover:text-pinkDark md:hover:bg-pinkDark/20  relative group cursor-pointer transition-colors "`}>
                        <Link aria-label="Go to series page" href='/series' className="flex items-center gap-2 sm:text-sm md:text-lg tv:text-2xl md:p-6 lg:p-8 tv:px-12 tv:py-10">
                            <PiMonitorPlay className='text-2xl tv:text-4xl' />
                            <span className="hidden sm:block">
                                Series
                            </span>
                        </Link>
                        <span className={`w-[5px] hidden md:inline-block bg-pinkDark absolute right-0 bottom-[20%] transition-[height] ease duration-300 group-hover:h-3/5  ${router.asPath.includes('/series') || router.asPath.includes('tv') ? 'h-3/5 ' : 'h-0'}`}></span>
                    </li>
                    <li className={`${router.asPath === '/list' ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'} md:w-full hover:text-pinkDark dark:hover:text-pinkDark md:hover:bg-pinkDark/20  relative group cursor-pointer transition-colors "`}>
                        <Link aria-label="Go to mylist page" href='/list' className="flex items-center gap-2 sm:text-sm md:text-lg tv:text-2xl md:p-6 lg:p-8 tv:px-12 tv:py-10">
                            <RiPlayList2Line className='text-2xl tv:text-4xl' />
                            <span className="hidden sm:block">
                                My List
                            </span>
                        </Link>
                        <span className={`w-[5px] hidden md:inline-block  bg-pinkDark absolute right-0 bottom-[20%] transition-[height] ease duration-300 group-hover:h-3/5  ${router.asPath === '/list' ? 'h-3/5 ' : 'h-0'}`}></span>
                    </li>
                    <li className={`${router.asPath === '/auth' ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'} block md:hidden md:w-full hover:text-pinkDark dark:hover:text-pinkDark md:hover:bg-pinkDark/20  relative group cursor-pointer transition-colors `}

                        onClick={
                            () => user ? signOut() : null
                        }
                    >
                        <Link href='/auth' aria-label="Go to auth page for Log out or Login" className="flex items-center md:p-6 lg:p-8 tv:px-12 tv:py-10 gap-2 sm:text-sm md:text-lg tv:text-2xl">
                            <IoLogOutOutline className={`${user ? 'scale-x-[-1]' : ''} text-2xl tv:text-4xl`} />
                            {
                                user ? <span className="hidden sm:block"> Log out</span> : <span className="hidden sm:block"> Login</span>
                            }

                        </Link>
                        <span className={`w-[3px] hidden md:inline-block rounded-full bg-pinkDark absolute right-0 bottom-[20%] transition-[height] ease duration-300 group-hover:h-3/5 h-0`}></span>
                    </li>
                </ul>
            </div>
            <div className=" w-full">
                <ul className="w-full flex flex-col items-center justify-centeer">
                    <li className={`${router.asPath === '/auth' ? 'md:bg-pinkDark/20 text-pinkDark' : 'text-dark dark:text-neutral-100'} hidden md:block md:w-full hover:text-pinkDark dark:hover:text-pinkDark md:hover:bg-pinkDark/20  relative group cursor-pointer transition-colors "`}
                        onClick={
                            () => user && signOut()}
                    >
                        <Link aria-label="Go to auth page for Log out or Login" href='/auth' className=" md:p-6 lg:p-8 tv:px-12 tv:py-10 flex items-center gap-2 text-lg tv:text-2xl">
                            <IoLogOutOutline className={`${user ? 'scale-x-[-1]' : ''} text-2xl tv:text-4xl`} />
                            {
                                user ? 'Log out' : 'Login'
                            }
                        </Link>
                        <span className={`w-[5px] hidden md:inline-block  bg-pinkDark absolute right-0 bottom-[20%] transition-[height] ease duration-300 group-hover:h-3/5  ${router.asPath === '/auth' ? 'h-3/5 ' : 'h-0'}`}></span>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar