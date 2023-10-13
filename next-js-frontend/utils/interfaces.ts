

export interface Luggage {
    id: number;
    size: number;
    images: string[];
    items: string[];
    dangerousItems: boolean;
    userId: number;
    recieverName: string;
}

export interface Transport {
    id: number;
    departure: string;
    transportCode: string;
    transportType: "BOLT" | "JETTY"
    destination: string;
    maxBookingSlots: number;
}
export interface Booking {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    luggageId: number;
    transportId: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    attendantId: number | null;
    bookingVerificationCode: string | null;
    luggage: Luggage;
    transport: Transport
}