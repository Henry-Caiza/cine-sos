import { RiSearchLine } from 'react-icons/ri'
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge"
import ButtonSearch from './ButtonSearch';
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';

function Header({ name, className, type }) {
    const [mode, setMode] = useThemeSwitcher();
    return (
        <header className={twMerge(
            `pt-8`,
            className
        )}>
            <div className='flex flex-row justify-between md:items-center gap-4 mb-6'>
                <ButtonSearch type={type} />
                <div className='text-neutral-100 flex gap-2 md:gap-4 items-center'>
                    <button
                        name={`button mode ${mode}`}
                        aria-label={`button mode ${mode}`}
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        className={`w-10 h-10 flex items-center justify-center rounded-full p-1 
                    ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
                    `}
                    >
                        {
                            mode === 'dark' ?
                                <IoSunnyOutline className='text-2xl text-dark' />
                                : <IoMoonOutline className='text-2xl' />
                        }
                    </button>
                    {
                        name && <div className='w-10 h-10 bg-redDark rounded-full flex justify-center items-center'>
                            <span className='text-xl font-semibold md:pb-1'>{name?.slice(0, 1)}</span>
                        </div>
                    }

                </div>
            </div>
        </header>
    )
}

export default Header