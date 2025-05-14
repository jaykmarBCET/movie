import axios from 'axios'

export interface movieInfo{
    adult:boolean | false;
    backdrop_path:string;
    genre_idx:number[];
    title:string;
    id:number;
    origin_country:string[];
    original_name:string;
    original_language:string;
    overview:string;
    popularity:number;
    poster_path:string;
    first_air_date:string;
    name:string;
    vote_average:number;
    vote_count:number;
    release_date:string;
}

const baseUrl = process.env.EXPO_PUBLIC_API_TMDB_URL

const secret_Key = process.env.EXPO_PUBLIC_API_TMDB_SECRET_KEY
const api_key = process.env.EXPO_PUBLIC_API_TMDB_API_KEY

export const topRatedMovie = axios.create({
    baseURL:`${baseUrl}/tv/top_rated`,
    params:{
        language:'en-US',
        api_key:api_key
    },
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
})

export const popularMovie = axios.create({
    baseURL:`${baseUrl}/tv/popular`,
    params:{
        language:'en-US'
    },
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
})

export const upcomingMovie = axios.create({
    baseURL:`${baseUrl}/movie/upcoming`,
    params:{
        language:'en-US'
    },
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
})

export interface movieListInfo{
    id:number;
    name:string;
}



export const movieTypeList = axios.create({
    baseURL:`${baseUrl}/genre/movie/list`,
    params:{
        language:'en-US'
    },
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
})
export interface searchKeyWordInfo{
    id:number;
    name:string;
}
// query
export const searchKeyWord  = axios.create({
    baseURL:`${baseUrl}/search/keyword`,
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
}) 
// query,year,region
export const searchMovie  = axios.create({
    baseURL:`${baseUrl}/search/movie`,
    params:{
        include_adult:false,
        language:'en-US'
    },
    headers:{
        Authorization:`Bearer ${secret_Key}`
    }
})


export const getMovieInfo = axios.create({
    baseURL:`${baseUrl}/movie`,
    headers:{
        Authorization:` Bearer ${secret_Key}`
    },
    
    params:{
        api_key,
        include_adult:false
    }
})
