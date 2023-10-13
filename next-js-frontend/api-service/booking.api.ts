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

export const approveBooking = async (accessToken: string, bookingId: number) => {
    try {
        const response = await api.get(`/approve-booking/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const rejectBooking = async (accessToken: string, bookingId: number) => {
    try {
        const response = await api.get(`/reject-booking/${bookingId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};


