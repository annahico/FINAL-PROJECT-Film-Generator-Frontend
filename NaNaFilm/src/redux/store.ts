import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import movieReducer from "./slices/movieSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
    },
    // El middleware por defecto ya incluye thunk, así que no es necesario configurarlo explícitamente a menos que quieras personalizarlo
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
