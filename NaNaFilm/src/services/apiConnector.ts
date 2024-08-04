import axios, { Method } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1';

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
    bodyData?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
}

export const apiConnector = async <T>({
    method,
    url,
    bodyData,
    headers,
    params,
}: ApiConnectorParams): Promise<T> => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData ?? null,
            headers: headers ?? undefined,
            params: params ?? undefined,
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
