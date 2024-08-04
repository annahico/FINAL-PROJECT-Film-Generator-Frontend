export interface SignUPdata {
    email: string;
    name: string;
    password: string;
}

export interface Comment {
    _id: string; 
    text: string;
    rating: string;
    userId: {
        name: string;
    };
    createdAt: string; 
}

export interface Logindata {
    email: string;
    password: string;
}

export interface Movie {
    _id: string;
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    ratings: { source: string; value: string; }[]; 
    poster: string;
    response: string;
    commentIds: Comment[]; 
}

export interface UserState {
    Movies: Movie[];
    loading: boolean;
    movies: Movie[];
    favMovies: Movie[]; 
    isSearch: boolean;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    favMovies: Movie[]; 
    __v: number;
}

export interface LoginResponse {
    data: {
        success: boolean;
        message: string;
        token: string;
        user: User;
    };
}

export interface AuthState {
    currentUser: User | null;
    token: string | null; 
}
