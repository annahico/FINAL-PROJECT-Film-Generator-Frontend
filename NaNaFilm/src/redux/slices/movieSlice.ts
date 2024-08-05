import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserState } from "../../utils/interface/types";

const initialState: UserState = {
    Movies: [],           
    loading: false,
    movies: [],
    favMovies: [],
    isSearch: false,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setMovies(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
        },
        setFavMovies(state, action: PayloadAction<Movie[]>) {
            state.favMovies = action.payload;
        },
        setIsSearch(state, action: PayloadAction<boolean>) {
            state.isSearch = action.payload;
        }
    },
});

export const { setLoading, setMovies, setFavMovies, setIsSearch } = movieSlice.actions;

export default movieSlice.reducer;
