
import { BounceLoader } from "react-spinners"

function LoadingSpinner({ isLoading }) {
    return (
        <>
            {
                isLoading ?
                    <div
                        className={`h-full flex items-center justify-center bg-black  w-full z-50 absolute`}
                    >
                        <BounceLoader color="#fc6758" size={60} loading={isLoading} className="w-screen h-screen" />
                    </div> :
                    null
            }
        </>

    )
}

export default LoadingSpinner