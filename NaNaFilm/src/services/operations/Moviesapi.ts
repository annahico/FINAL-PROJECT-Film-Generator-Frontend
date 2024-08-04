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
    Ratings: string;
    Plot: string;
    Year: string;
}

interface MovieResponse {
    allMovie?: Movie[];
}

interface FavMovieResponse {
    favMovies?: Movie[];
}

interface CommentResponse {
    message?: string;
}

// Fetch Movies
export const fetchMovies = async (): Promise<Movie[] | null> => {
    const { All_Movies_API } = movieEndPoints;

    try {
        const response: ApiResponse<MovieResponse> = await apiConnector({
            method: "GET",
            url: All_Movies_API,
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to fetch movies");
        }

        return response.data?.allMovie || [];
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to fetch movies");
        } else {
            toast.error("Failed to fetch movies");
        }
        return null;
    }
}

// Fetch Favorite Movies
export const fetchFavMovie = async (token: string): Promise<Movie[] | null> => {
    const { Fav_Movies_API } = movieEndPoints;

    try {
        const response: ApiResponse<FavMovieResponse> = await apiConnector({
            method: "GET",
            url: Fav_Movies_API,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to fetch favorite movies");
        }

        return response.data?.favMovies || [];
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to fetch favorite movies");
        } else {
            toast.error("Failed to fetch favorite movies");
        }
        return null;
    }
}

// Add Favorite Movie
export const addFavMovie = async (token: string, _id: string): Promise<void> => {
    const { Add_Fav_Movie_API } = movieEndPoints;

    try {
        const response: ApiResponse<CommentResponse> = await apiConnector({
            method: "POST",
            url: `${Add_Fav_Movie_API}/${_id}`,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to add favorite movie");
        }

        toast.success(response.message || "Movie added to favorites");
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to add favorite movie");
        } else {
            toast.error("Failed to add favorite movie");
        }
    }
}

// Remove Favorite Movie
export const removeFavMovie = async (token: string, _id: string): Promise<Movie[]> => {
  const { REMOVE_Fav_Movie_API } = movieEndPoints;

  try {
    const response: ApiResponse<FavMovieResponse> = await apiConnector({
      method: "POST",
      url: `${REMOVE_Fav_Movie_API}/${_id}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to remove favorite movie");
    }

    toast.success(response.message || "Movie removed from favorites");
    return response.data?.favMovies || []; // Devolver un array vacío en lugar de null
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "Failed to remove favorite movie");
    } else {
      toast.error("Failed to remove favorite movie");
    }
    return []; // Devolver un array vacío en caso de error
  }
}

// Add Comment
export const addComment = async (token: string, _id: string, text: string, rating: string): Promise<void> => {
    const { ADD_COMMENT_API } = movieEndPoints;

    try {
        const response: ApiResponse<CommentResponse> = await apiConnector({
            method: "POST",
            url: `${ADD_COMMENT_API}/${_id}`,
            bodyData: { text, rating },
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.success) {
            throw new Error(response.message || "Failed to add comment");
        }

        toast.success(response.message || "Comment added successfully");
    } catch (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to add comment");
        } else {
            toast.error("Failed to add comment");
        }
    }
}
