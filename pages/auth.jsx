import { useCallback, useState } from 'react'
import Head from 'next/head'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import imageLogin from '@/public/images/1.jpg'

import axios from 'axios'

const AuthPage = () => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [isInputFocused, setIsInputFocused] = useState(true);
    const [variant, setVariant] = useState('login')
    const { register: registerForm, handleSubmit, formState: { errors } } = useForm()

    const handleInputFocus = () => {
        setIsInputFocused(false)
    }

    const toggleVariant = useCallback(() => {
        handleInputFocus()
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async (email, password) => {
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })
            if (res.error) {
                setError(res.error)
                setIsInputFocused(true);
            } else { router.push('/') }
        } catch (error) {
            console.log(error);
        }
    }, [router])

    const register = useCallback(async (name, email, password) => {
        try {
            await axios.post('/api/register', {
                name,
                email,
                password
            })
            login(email, password,)
        } catch (error) {
            setError('Email already exists');
            setIsInputFocused(true);
        }
    }, [login])

    const onSubmit = handleSubmit(async (data) => {
        if (variant === 'login' && data) {
            login(data.email, data.password)
        } else if (variant === 'register' && data) {
            register(data.name, data.email, data.password)
        }
        else {
            console.log('error');
        }
    })

    return (
        <>
            <Head>
                <title>Auth | CINESOS</title>
                <meta name='Auth' content='Auth Page of CINESOS' />
            </Head>
            <main className='relative h-full w-full sm:py-8 sm:px-8 lg:py-12 md:pl-48 md:pr-4 xl:py-12 tv:py-32 xl:pl-72 xl:pr-28 tv:px-[40rem] bg-[url("/images/wall.jpg")] z-0 flex items-center'>
                <div className='w-full h-full bg-black absolute top-0 left-0 opacity-70 -z-10'></div>
                <div className='w-full h-full sm:h-[90vh] tall:h-[60vh] lg:h-[90vh] tv:h-[75vh] flex border-2 border-dark sm:rounded-2xl bg-light/80 dark:bg-dark/80 backdrop-blur-sm shadow-[0_0px_15px_-2px] shadow-dark'>
                    <div className='w-full sm:w-1/2 py-12 px-4 sm:py-8 md:px-8 lg:px-16 xl:px-20 text-gray-200 flex flex-col gap-4 sm:justify-between'>
                        <div className='w-full flex flex-col gap-2 text-dark dark:text-light'>
                            <h2 className='text-lg lg:text-xl font-semibold text-center '>Welcome</h2>
                            <h3 className='text-xl lg:text-3xl text-center font-semibold'>{variant === 'login' ? 'Please enter your login information.' : 'Start watching with a free account.'}</h3>
                        </div>
                        <button
                            name='button sigIn google'
                            aria-label='button sigIn google'
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className='w-full flex gap-4 items-center justify-center border border-neutral-700 rounded-full py-2 px-4 bg-neutral-900 text-sm hover:bg-neutral-700 transition-colors'>
                            <FcGoogle size={20} />
                            {variant === 'login' ? 'Login with Google' : 'Sign up with Google'}
                        </button>
                        <div className=' flex gap-8 w-full items-center text-neutral-700 dark:text-neutral-400'>
                            <hr className='w-full border border-neutral-700' />
                            <span>or</span>
                            <hr className='w-full border border-neutral-700' />
                        </div>
                        <form onSubmit={onSubmit} className='flex flex-col gap-3'>
                            {
                                variant === 'register' &&
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='name'
                                        className="block pt-6 pb-1 w-full text-sm text-dark dark:text-white border-b border-neutral-700 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                        placeholder=""
                                        {
                                        ...registerForm('name', {
                                            required: "Username is required",
                                            pattern: {
                                                value: /^[A-Za-z]+$/i,
                                                message: 'Not allowed numbers.'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Please enter a minimum  of 3 letters.'
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: 'Please enter a maximum of 20 letters.'
                                            },
                                        })
                                        }
                                        onFocus={handleInputFocus}
                                    />
                                    <label
                                        className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                                        htmlFor='name'>Username</label>
                                    {
                                        errors.name && (<span className='text-pinkDark text-xs absolute right-0'>{errors.name.message}</span>)
                                    }
                                </div>
                            }
                            <div className="relative">
                                <input
                                    type='email'
                                    id='email'
                                    className="block pt-6 pb-1 w-full text-sm text-dark dark:text-white border-b border-neutral-700 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                    placeholder=" "
                                    {
                                    ...registerForm('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Please enter an email valid.'
                                        },
                                    })
                                    }
                                    onFocus={handleInputFocus}
                                />
                                <label
                                    className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                                    htmlFor='email'>Email</label>
                                {
                                    errors.email && (<span className='text-pinkDark text-xs absolute right-0'>{errors.email.message}</span>)
                                }
                            </div>
                            <div className="relative">
                                <input
                                    type='password'
                                    id='password'
                                    className="block pt-6 pb-1 w-full text-sm text-dark dark:text-white border-b border-neutral-700 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                    placeholder=" "
                                    {
                                    ...registerForm('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 5,
                                            message: 'Please enter a minimum of 5 characters.'
                                        },
                                    })
                                    }

                                    onFocus={handleInputFocus}
                                />
                                <label
                                    className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                                    htmlFor='password'>Password</label>
                                {
                                    errors.password && (<span className='text-pinkDark text-xs absolute right-0 pb-9'>{errors.password.message}</span>)
                                }
                            </div>
                            {
                                error && isInputFocused && <span className={`${error && isInputFocused ? 'opacity-100' : 'opacity-0'} transition-all text-pinkDark text-xs`}>{error}</span>
                            }
                            <button
                                name='button login'
                                aria-label='button login'
                                className='w-full rounded-full mt-4 py-2 px-4 bg-gradient-to-r from-redDark to-pinkDark text-sm'>{variant === 'login' ? 'Login' : 'Sign up'}</button>
                        </form>
                        <p className='text-neutral-500 text-sm w-full text-center'>
                            {variant === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={toggleVariant}
                                className='text-black dark:text-white ml-1 hover:underline cursor-pointer'>
                                {variant === 'login' ? 'Sign up for free' : 'Login'}

                            </span>
                        </p>
                    </div>
                    <div className='hidden sm:block w-1/2 h-full'>
                        <img src={imageLogin.src} alt="" className='w-full h-full object-cover rounded-r-xl' />
                    </div>
                </div>
            </main>
        </>

    )
}

export default AuthPage