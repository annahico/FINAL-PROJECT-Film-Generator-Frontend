import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Movie } from "../../utils/interface/types";
import { movieEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

// Interfaz para la respuesta de la API
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

// Interfaz para la respuesta de películas favoritas
interface FavMovieResponse {
    favMovies: Movie[];
}

// Función para obtener las películas favoritas
export const fetchFavMovie = async (token: string): Promise<FavMovieResponse> => {
    const { Fav_Movies_API } = movieEndPoints;

    try {
        const response: ApiResponse<FavMovieResponse> = await apiConnector({
            method: "GET",
            url: Fav_Movies_API,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to fetch favorite movies");
        }

        // Devuelve la data directamente, no es necesario acceder a response.data.favMovies
        return response.data || { favMovies: [] };
    } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Failed to fetch favorite movies";
        toast.error(errorMessage);
        return { favMovies: [] }; // Retorna una lista vacía en caso de error
    }
}

// Función para agregar una película a favoritos
export const addFavMovie = async (token: string, movieId: string): Promise<FavMovieResponse> => {
    const { Add_Fav_Movie_API } = movieEndPoints;

    try {
        const response: ApiResponse<FavMovieResponse> = await apiConnector({
            method: "POST",
            url: Add_Fav_Movie_API,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { movieId }
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to add favorite movie");
        }

        return response.data || { favMovies: [] };
    } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Failed to add favorite movie";
        toast.error(errorMessage);
        throw error;
    }
}

// Función para eliminar una película de favoritos
export const removeFavMovie = async (token: string, movieId: string): Promise<Movie[]> => {
    const { REMOVE_Fav_Movie_API } = movieEndPoints;

    try {
        const response: ApiResponse<FavMovieResponse> = await apiConnector({
            method: "DELETE",
            url: REMOVE_Fav_Movie_API,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { movieId }
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to remove favorite movie");
        }

        return response.data?.favMovies || [];
    } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Failed to remove favorite movie";
        toast.error(errorMessage);
        throw error;
    }
}

// Función para agregar un comentario
export const addComment = async (token: string, movieId: string, text: string, rating: string): Promise<unknown> => {
    const { ADD_COMMENT_API } = movieEndPoints;

    try {
        const response: ApiResponse<unknown> = await apiConnector({
            method: "POST",
            url: ADD_COMMENT_API,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { movieId, text, rating }
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to add comment");
        }

        return response.data;
    } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Failed to add comment";
        toast.error(errorMessage);
        throw error;
    }
}

// Función para obtener todas las películas
export const fetchMovies = async (): Promise<Movie[]> => {
    const { All_Movies_API } = movieEndPoints;

    try {
        const response: ApiResponse<Movie[]> = await apiConnector({
            method: "GET",
            url: All_Movies_API
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to fetch movies");
        }

        return response.data || [];
    } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Failed to fetch movies";
        toast.error(errorMessage);
        return [];
    }
};