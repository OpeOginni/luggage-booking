import { BookingStatus } from 'src/auth/enums';
import { z } from 'zod';

export const createBookingSchema = z
    .object({
        luggageId: z.number(),
        transportId: z.number(),
    }).required()

export const deleteBookingSchema = z
    .object({
        bookingId: z.number(),
    })

export const approveBookingSchema = z.object({
    bookingId: z.number(),
    attendantId: z.number(),
    status: z.nativeEnum(BookingStatus)
})

export const getBookingSchema = z.object({
    bookingId: z.number(),
}).required()

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type DeleteBookingDto = z.infer<typeof deleteBookingSchema>;
export type ApproveBookingDto = z.infer<typeof approveBookingSchema>;
export type GetBookingDto = z.infer<typeof getBookingSchema>;


