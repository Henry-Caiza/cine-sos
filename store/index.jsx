import { API_KEY, TMBD_BASE_URL, api } from "@/utils/constants"
import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    movies: [],
    moviesTrending: [],
    listMovies: {},
    datesUpcoming: {},
    listSeries: {},
    listCollection: {},
    similarMovies: [],
    genresLoaded: false,
    genres: [],
    seasons: [],
    seasonsLoaded: false,
    detailsMovies: {},
    detailsSeries: {},
    credits: {},
    videos: [],
    images: {}
}

export const getGenres = createAsyncThunk("cinesos/genres", async ({ type }) => {
    const { data: { genres } } = await api(`genre/${type}/list`)
    return genres

})

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = []
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre)
            if (name) movieGenres.push(name.name)
        })
        if (movie.backdrop_path && movie.poster_path) {
            try {
                moviesArray.push({
                    id: movie.id,
                    name: movie?.title ? movie.title : movie.name,
                    image: movie.poster_path,
                    image_backdrop: movie.backdrop_path,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    genres: movieGenres.slice(0, 3),
                    date: movie?.release_date ? movie.release_date : movie.first_air_date,
                    media_type: movie.media_type,
                    vote_average: movie?.vote_average,
                    popularity: movie.popularity,
                    number_of_seasons: movie.number_of_seasons,
                })
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
    })
}

const getRawData = async (api, genres, paging, page) => {
    const moviesArray = []
    for (let i = 1; moviesArray.length < page * 20 && i <= page; i++) {
        const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`
        )
        createArrayFromRawData(results, moviesArray, genres)
    }
    return moviesArray
}



export const fetchAllMovies = createAsyncThunk("cinesos/all", async ({ type, pageNumber }, thunkApi) => {
    const { cinesos: { genres } } = thunkApi.getState()
    return getRawData(
        `${TMBD_BASE_URL}/trending/${type}/day?api_key=${API_KEY}`,
        genres,
        true,
        pageNumber
    )
})

export const fetchTrendingMovies = createAsyncThunk("cinesos/trending", async ({ type, pageNumber }, thunkApi) => {
    const { cinesos: { genres } } = thunkApi.getState()
    return getRawData(
        `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true,
        pageNumber
    )
})

export const fetchListMovies = createAsyncThunk("cinesos/listMovies", async ({ type }, thunkApi) => {

    const [upcomingArray, popularArray, topArray] = [[], [], []];
    const { cinesos: { genres } } = thunkApi.getState();

    const fillArray = async (endpoint, array) => {
        for (let i = 1; array.length < 20; i++) {
            const { data: { results } } = await api(endpoint);
            createArrayFromRawData(results, array, genres);
        }
    };

    const fillArrayUpcoming = async (endpoint, array) => {
        for (let i = 1; array.length < 4 * 20 && i <= 4; i++) {
            const { data: { results } } = await axios.get(`${TMBD_BASE_URL}${endpoint}?api_key=${API_KEY}&page=${i}}`
            )
            createArrayFromRawData(results, array, genres)
        }
    };

    await Promise.all([
        fillArrayUpcoming("/movie/upcoming", upcomingArray),
        fillArray("/movie/popular", popularArray),
        fillArray("/movie/top_rated", topArray)
    ]);

    const listArray = {
        upcomingMovies: upcomingArray,
        popularMovies: popularArray,
        topMovies: topArray,
    };
    return listArray;
})

export const fetchDatesUpcoming = createAsyncThunk("cinesos/dateUpcoming", async () => {
    try {
        const { data: { dates } } = await api(`movie/upcoming`);
        return dates
    } catch (error) {
        console.error("Error fetching details:", error)
        throw error
    }
})

export const fetchListSeries = createAsyncThunk("cinesos/listSeries", async ({ type }, thunkApi) => {
    const [upcomingArray, popularArray, topArray] = [[], [], []];
    const { cinesos: { genres } } = thunkApi.getState();

    const fillArray = async (endpoint, array) => {
        for (let i = 1; array.length < 20; i++) {
            const { data: { results } } = await api(endpoint);
            createArrayFromRawData(results, array, genres);
        }
    };

    await Promise.all([
        fillArray("/tv/airing_today", upcomingArray),
        fillArray("/tv/popular", popularArray),
        fillArray("/tv/top_rated", topArray)
    ]);

    const listArray = {
        upcomingSeries: upcomingArray,
        popularSeries: popularArray,
        topSeries: topArray,
    };
    return listArray;
})

export const fetchListCollection = createAsyncThunk("cinesos/collection", async ({ type }, thunkApi) => {
    const [magicWorld, magicWorldFantastic, terrorWorld, terrorWorldAnabell, terrorWorldNun, superWorld] = [[], [], [], [], [], []];
    const { cinesos: { genres } } = thunkApi.getState();

    const fillArray = async (endpoint, array) => {
        for (let i = 1; array.length < 15 && i < 2; i++) {
            const { data: { parts } } = await api(endpoint);
            createArrayFromRawData(parts, array, genres);
        }
    };

    await Promise.all([
        fillArray("/collection/1241", magicWorld),
        fillArray("/collection/435259", magicWorldFantastic),
        fillArray("/collection/313086", terrorWorld),
        fillArray("/collection/402074", terrorWorldAnabell),
        fillArray("/collection/968052", terrorWorldNun),
        fillArray("/collection/86311", superWorld)
    ]);

    const listArray = {
        magicWorldCollection: magicWorld.concat(magicWorldFantastic),
        terrorWorldCollection: terrorWorld.concat(terrorWorldAnabell.concat(terrorWorldNun)),
        superWorldCollection: superWorld,

    };
    return listArray;
})


export const fetchSimilarMovies = createAsyncThunk("cinesos/similar", async ({ type, pageNumber, id }, thunkApi) => {
    const { cinesos: { genres } } = thunkApi.getState()
    return getRawData(
        `${TMBD_BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`,
        genres,
        false,
        pageNumber
    )
})

export const fetchSearch = createAsyncThunk("cinesos/search", async ({ type, pageNumber, query }, thunkApi) => {
    const { cinesos: { genres } } = thunkApi.getState()
    return getRawData(
        `${TMBD_BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`,
        genres,
        true,
        pageNumber
    )
})

export const fetchDataByGenre = createAsyncThunk("cinesos/dataByGenre", async ({ genre, type, pageNumber }, thunkApi) => {
    const { cinesos: { genres } } = thunkApi.getState()
    return getRawData(
        `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres,
        true,
        pageNumber,
    )
})

export const fetchDetailsMovies = createAsyncThunk("cinesos/detailsMovies", async ({ id }) => {
    try {
        const { data } = await api(`movie/${id}`);
        return data
    } catch (error) {
        console.error("Error fetching details:", error)
        throw error
    }
})

export const fetchDetailsSeries = createAsyncThunk("cinesos/detailsSeries", async ({ id }) => {
    try {
        const { data } = await api(`tv/${id}`);
        return data
    } catch (error) {
        console.error("Error fetching details:", error);
        throw error
    }
})

export const fetchCredits = createAsyncThunk("cinesos/credits", async ({ type, id }) => {
    try {
        const { data } = await api(`${type}/${id}/credits`);
        return data
    } catch (error) {
        console.error("Error fetching credits:", error);
        throw error
    }
})

export const fetchSeasons = createAsyncThunk("cinesos/seasons", async ({ id }) => {
    const seasonsArray = []
    const { data } = await api(`tv/${id}`);
    try {
        for (let i = 1; seasonsArray.length <= data.number_of_seasons && i <= data.number_of_seasons; i++) {
            const { data } = await api(`tv/${id}/season/${i}`);
            seasonsArray.push({
                id: data.id,
                name: data.name,
                episodes: data.episodes,
                episode_count: data.episode_count,
            })
        }
        return seasonsArray;
    } catch (error) {
        console.error("Error fetching seasons:", error);
        throw error;
    }
})

export const fetchImages = createAsyncThunk("cinesos/images", async ({ type, id }) => {
    try {
        const { data } = await api(`${type}/${id}/images`, {
            params: {
                "language": 'en,null'
            }
        });
        return data
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error
    }
})

export const fetchVideos = createAsyncThunk("cinesos/videos", async ({ type, id }) => {
    try {
        const { data } = await api(`${type}/${id}/videos`, {
            params: {
                "language": 'en'
            }
        });
        return data.results
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error
    }
})

const CinesosSlice = createSlice({
    name: "Cinesos",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })

        builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })

        builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
            state.moviesTrending = action.payload;
        })

        builder.addCase(fetchListMovies.fulfilled, (state, action) => {
            state.listMovies = action.payload;
        })

        builder.addCase(fetchDatesUpcoming.fulfilled, (state, action) => {
            state.datesUpcoming = action.payload;
        })

        builder.addCase(fetchListSeries.fulfilled, (state, action) => {
            state.listSeries = action.payload;
        })

        builder.addCase(fetchListCollection.fulfilled, (state, action) => {
            state.listCollection = action.payload;
        })

        builder.addCase(fetchSimilarMovies.fulfilled, (state, action) => {
            state.similarMovies = action.payload;
        })

        builder.addCase(fetchSearch.fulfilled, (state, action) => {
            state.movies = action.payload;
        })

        builder.addCase(fetchDetailsMovies.fulfilled, (state, action) => {
            state.detailsMovies = action.payload;
        })

        builder.addCase(fetchDetailsSeries.fulfilled, (state, action) => {
            state.detailsSeries = action.payload;
        })

        builder.addCase(fetchCredits.fulfilled, (state, action) => {
            state.credits = action.payload;
        })

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.videos = action.payload;
        })

        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.images = action.payload;
        })

        builder.addCase(fetchSeasons.fulfilled, (state, action) => {
            state.seasons = action.payload;
            state.seasonsLoaded = true
        })

        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.moviesTrending = action.payload;
        })
    },

})

export const store = configureStore({
    reducer: {
        cinesos: CinesosSlice.reducer,
    }
})

