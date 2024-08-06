import axios, { Method } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api/v1';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
    // Agregar lógica de solicitud, como autenticación
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    // Manejar errores de respuesta
    console.error("API Error:", error);
    return Promise.reject(error);
});

interface ApiConnectorParams {
    method: Method;
    url: string;
    data?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
}

export const apiConnector = async <T>({
    method,
    url,
    data,
    headers,
    params,
}: ApiConnectorParams): Promise<T> => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            headers,
            params,
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
