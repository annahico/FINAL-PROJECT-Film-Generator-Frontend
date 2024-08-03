import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, UserState } from "../../utils/interface/types";

// Define el estado inicial para el slice de usuario
const initialState: UserState = {
  loading: false,
  movies: [],
  favMovies: [],
  isSearch: false
};

// Crea el slice de usuario
const userSlice = createSlice({
  name: "movie", // Puedes considerar cambiar esto a "user" o "movies" si es más apropiado
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

// Exporta las acciones
export const { setLoading, setMovies, setFavMovies, setIsSearch } = userSlice.actions;

// Exporta el reducer
export default userSlice.reducer;
