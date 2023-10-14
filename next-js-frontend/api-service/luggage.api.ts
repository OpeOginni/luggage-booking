"use server"
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL: baseUrl,
});

export const getBookings = async (accessToken: string) => {
    try {
        const response = await api.get('/bookings', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createLuggage = async (size: number, transportId: number, recieverName: string, accessToken: string) => {

    try {
        const response = await api.post('/luggage/create', {
            size: size,
            items: [],
            dangerousItems: false,
            recieverName: recieverName,
            transportId: transportId

        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};



