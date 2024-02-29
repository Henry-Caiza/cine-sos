import { FaStar } from "react-icons/fa";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { twMerge } from "tailwind-merge"

export function rating(rate) {
    const average = rate * 5 / 10
    return average.toPrecision(2)
}

export function hoursDuration(time) {
    dayjs.extend(duration);
    const dateMs = time * 60 * 1000
    const hourDuration = dayjs.duration(dateMs).hours()
    return hourDuration
    //console.log(a);
}

export function minutesDuration(time) {
    dayjs.extend(duration);
    const dateMs = time * 60 * 1000
    const minuteDuration = dayjs.duration(dateMs).minutes()
    return minuteDuration
    //console.log(a);
}

export function objDetails(obj, newObj, type) {
    newObj.id = obj.id
    newObj.name = obj?.title ? obj.title : obj.name
    newObj.image = obj.poster_path
    newObj.image_backdrop = obj.backdrop_path
    newObj.overview = obj.overview
    newObj.date = obj?.release_date ? obj.release_date : obj.first_air_date
    newObj.media_type = type
    newObj.vote_average = obj.vote_average
    newObj.popularity = obj.popularity
    newObj.number_of_seasons = obj.number_of_seasons
    return newObj
}

export function createArrImagesMedia(movie) {
    let arrImgages = []
    for (let i = 0; i < 5; i++) {
        const image = {
            original: `https://image.tmdb.org/t/p/w1280${movie[i]?.image_backdrop}`,
            thumbnail: `https://image.tmdb.org/t/p/w300${movie[i]?.image}`,
            description: `${movie[i]?.name}`,
            originalTitle: movie[i]?.id,
            originalAlt: movie[i]?.media_type,
            thumbnailAlt: movie[i]?.name,
            thumbnailClass: 'rounded-xl ',

        };
        arrImgages.push(image);
    }
    return arrImgages
}

export function findGenreById(genres, id) {
    return genres.find(genre => genre.id === id);
}
export function findGenreByName(genres, name) {
    return genres.find(genre => genre.name === name);
}

export const StarRating = ({ rating, className }) => {
    const numStars = 5;
    const stars = [];

    const roundedRating = Math.round(rating);

    for (let i = 1; i <= numStars; i++) {
        let starColor = 'text-neutral-400';

        if (i <= roundedRating) {
            starColor = 'text-redDark';
        }

        stars.push(
            <FaStar
                key={i}
                className={twMerge(`${starColor} xl:w-3 xl:h-3`, className)}
                style={{ marginRight: '0.15rem' }}
            />
        );
    }
    return <div className="flex">{stars}</div>;
}

export function filterDates(data, minFecha, maxFecha) {
    const fechaMinima = new Date(minFecha)
    const fechaMaxima = new Date(maxFecha)
    const resultadosFiltrados = data.filter((resultado) => {
        const fechaLanzamiento = new Date(resultado.release_date);
        return fechaLanzamiento >= fechaMinima && fechaLanzamiento <= fechaMaxima;
    })

    return resultadosFiltrados;
}

export const dataLeftSlider = [
    {
        imgUrl: 'https://i.imgur.com/86T8fZq.png',
        titleH3: 'OUR TOP 10',
        titleH2: 'Trending now',
        description: "The most-wached movies and series in your country in the past few days. Don't miss out.",

    },
    {
        imgUrl: 'https://image.tmdb.org/t/p/w500/n5A7brJCjejceZmHyujwUTVgQNC.jpg',
        titleH3: 'OUR MAGIC WORLD',
        titleH2: 'After All This Time? Always',
        description: "Experience the magic: The complete Harry Potter film collection.",
    },
    {
        imgUrl: 'https://image.tmdb.org/t/p/w500/5FrPZHgbbmTIq0oxpwSGqu5HyXC.jpg',
        titleH3: 'OUR WARREN COLLECTION',
        titleH2: 'Evil knows no bounds',
        description: "Experience the terror: The complete Warre film collection.",
    },
    {
        imgUrl: 'https://i.imgur.com/86T8fZq.png',
        titleH3: 'OUR TOP 10 MOVIES',
        titleH2: 'Trending now',
        description: "The most-wached movies in your country in the past few days. Don't miss out.",
    },
    {
        imgUrl: 'https://i.imgur.com/86T8fZq.png',
        titleH3: 'OUR TOP 10 SERIES',
        titleH2: 'Trending now',
        description: "The most-wached series in your country in the past few days. Don't miss out.",
    },

]
