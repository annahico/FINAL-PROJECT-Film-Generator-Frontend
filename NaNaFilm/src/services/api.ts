const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1';

export const endpoints = {
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
}

export const movieEndPoints = {
    All_Movies_API: `${BASE_URL}/movie/allMovies`,
    Fav_Movies_API: `${BASE_URL}/movie/getUserFavMovies`,
    Add_Fav_Movie_API: `${BASE_URL}/movie/setFavMovies`,
    REMOVE_Fav_Movie_API: `${BASE_URL}/movie/removeFavMovies`,
    ADD_COMMENT_API: `${BASE_URL}/movie/addComment`,
}
