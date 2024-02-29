import React from "react"
import { useForm } from "react-hook-form"

const Input = ({
    id,
    onChange,
    value,
    label,
    type
}) => {
    const { register, formState: { errors } } = useForm()
    console.log('los errores', errors);
    return (
        <div className="relative">
            <input
                onChange={onChange}
                type={type}
                {
                ...register(id, {
                    required: {
                        value: true,
                        message: "Username is required",
                    }
                })
                }
                value={value}
                id={id}
                className="block pt-6 pb-1 w-full text-sm text-dark dark:text-white border-b border-neutral-700 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                placeholder=" "
            />
            {
                errors.id && (<span className='text-red-500'>{errors.id.message}</span>)
            }
            <label
                className="absolute text-sm text-zinc-500 dark:text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor={id}>{label}</label>
        </div>

    )
}

export default Input