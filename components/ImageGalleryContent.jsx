import ImageGallery from "react-image-gallery"
import { useRouter } from "next/router"

export default function ImageGalleryContent({ images }) {
    const router = useRouter()
    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={true}
            showBullets={false}
            showNav={true}
            autoPlay={true}
            slideInterval={7000}
            slideDuration={1000}
            onClick={e => {
                if (e.target.alt === 'movie')
                    router.push(`/movie/${e.target.title}`)
                else if (e.target.alt === 'tv')
                    router.push(`/tv/${e.target.title}`)
            }}
        />
    )
}