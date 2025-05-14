import {
  searchMovie,
  topRatedMovie,
  movieInfo,
  searchKeyWordInfo,
  upcomingMovie,
  popularMovie,
  getMovieInfo
} from "@/api/api";
import { create } from "zustand";
import { AxiosResponse } from "axios";

export interface VideoInfo{
  id:string;
  key:string;
  name:string;
  site:string;
  size:number;
  type:string;
  official:boolean;
  published_at:string;
}


export interface MovieStoreInfo {
  topRatedMovie: movieInfo[] | [];
  upcomingMovie: movieInfo[] | [];
  movieList: movieInfo[] | [];
  popularMovie: movieInfo[] | [];
  searchMovie: movieInfo[] | [];
  searchKeyword: searchKeyWordInfo[] | [];
  isLoading: boolean;
  videos:VideoInfo[] | []
  getTopRatedMovie: (page: number) => Promise<void>;
  getUpcomingMovie: (page: number) => Promise<void>;
  getPopularMovie: (page: number) => Promise<void>;
  getSearchMovie: (params: {
    page: number | 1;
    query: string;
    year?: string;
    region?: string;
  }) => Promise<void>;
  getVideos:(movieId:number)=>Promise<void>;
}

export const useMovieStore = create<MovieStoreInfo>((set, get) => ({
  topRatedMovie: [],
  upcomingMovie: [],
  movieList: [],
  popularMovie: [],
  searchKeyword: [],
  searchMovie: [],
  isLoading: false,
  videos:[],
  getPopularMovie: async (page) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await popularMovie.get("", { params: { page } });
      if (response.status < 350) {
        const existing = get().popularMovie;
        set({ popularMovie: [...existing, ...response.data.results] });
      }
    } catch (err) {
      console.error("Popular movies fetch failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  getUpcomingMovie: async (page) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await upcomingMovie.get("", { params: { page } });
      if (response.status < 350) {
        const existing = get().upcomingMovie;
        set({ upcomingMovie: [...existing, ...response.data.results] });
      }
    } catch (err) {
      console.error("Upcoming movies fetch failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  getTopRatedMovie: async (page) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await topRatedMovie.get("", { params: { page } });
      if (response.status < 350) {
        const existing = get().topRatedMovie;
        set({ topRatedMovie: [...existing, ...response.data.results] });
      }
    } catch (err) {
      console.error("Top-rated movies fetch failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  getSearchMovie: async (params) => {
    set({ isLoading: true });
    try {
      const response: AxiosResponse = await searchMovie.get("", { params });
      if (response.status < 350) {
        const existing = get().searchMovie;
        set({ searchMovie: [...response.data.results, ...existing] });
      }
    } catch (err) {
      console.error("Search movies fetch failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  getVideos:async(movieId)=>{
    const response = await getMovieInfo.get(`/${movieId}/videos`)
    if(response.status<=300){
      set({videos:response.data.results})
    }
  }
}));
