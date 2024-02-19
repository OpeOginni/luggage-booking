"use server"
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL: baseUrl,
});

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/signin', { email, password });
        return response.data.access_token;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const authenticatedRequest = async (accessToken: string) => {
    try {
        const response = await api.get('/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {

    }
};
