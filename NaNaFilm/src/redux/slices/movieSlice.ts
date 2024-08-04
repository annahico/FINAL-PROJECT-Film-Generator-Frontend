import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../utils/interface/types"; // Ajusta la importación según tu estructura

interface UserState {
  loading: boolean;
  movies: Movie[];
  favMovies: Movie[];
  isSearch: boolean;
  Movies: Movie[];
}

const initialState: UserState = {
  loading: false,
  movies: [],
  favMovies: [],
  isSearch: false,
  Movies: []
};

const userSlice = createSlice({
  name: "movie",
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

export const { setLoading, setMovies, setFavMovies, setIsSearch } = userSlice.actions;

export default userSlice.reducer;
