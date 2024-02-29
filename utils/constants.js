import axios from "axios";


export const API_KEY = process.env.NEXT_PUBLIC_API_KEY
export const TMBD_BASE_URL = "https://api.themoviedb.org/3"

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json:charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        "language": 'en'
    }
});
