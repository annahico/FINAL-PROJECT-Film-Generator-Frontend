import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { movieEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

// Definición de las interfaces para las respuestas de la API
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface Movie {
    _id: string;
    Title: string;
    Poster: string;
    Ratings: { Value: string }[]; // Cambiado a un array de objetos con Value
    Plot: string;
    Year: string;
}

interface FavMovieResponse {
    favMovies?: Movie[];
}

export const fetchFavMovie = async (token: string): Promise<FavMovieResponse | null> => {
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

        return response.data || { favMovies: [] }; // Devolver el objeto directamente
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to fetch favorite movies");
        } else {
            toast.error("Failed to fetch favorite movies");
        }
        return null; // Devolver null en caso de error
    }
}
