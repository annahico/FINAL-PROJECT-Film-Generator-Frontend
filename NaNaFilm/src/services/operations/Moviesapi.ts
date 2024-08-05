import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Movie } from "../../utils/interface/types"; // Importa la interfaz Movie
import { movieEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface FavMovieResponse {
    favMovies?: Movie[];
}

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

        // Retorna un objeto con favMovies o una lista vacía por defecto
        return response.data || { favMovies: [] };
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to fetch favorite movies");
        } else {
            toast.error("Failed to fetch favorite movies");
        }
        return { favMovies: [] }; // Retorna una lista vacía en caso de error
    }
}


export const addComment = async (token: string, movieId: string, text: string, rating: string) => {
    const { ADD_COMMENT_API } = movieEndPoints;

    try {
        const response = await apiConnector({
            method: "POST",
            url: ADD_COMMENT_API,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                movieId,
                text,
                rating
            }
        });

        const responseData = response as ApiResponse<unknown>;

        if (!responseData.success) {
            throw new Error(responseData.message || "Failed to add comment");
        }

        return responseData.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to add comment");
        } else {
            toast.error("Failed to add comment");
        }
        throw error;
    }
}
