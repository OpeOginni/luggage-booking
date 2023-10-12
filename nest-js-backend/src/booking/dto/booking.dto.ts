import { BookingStatus } from 'src/auth/enums';
import { z } from 'zod';

export const createBookingSchema = z
    .object({
        luggageId: z.number(),
        transportId: z.number(),
        userId: z.number(),
    }).required()

export const deleteBookingSchema = z
    .object({
        bookingId: z.number(),
    })

export const approveBookingSchema = z.object({
    bookingId: z.number(),
    status: z.nativeEnum(BookingStatus)
})

export const getBookingSchema = z.object({
    bookingId: z.number()
}).required()

export const getMyBookingsSchema = z.object({
    userId: z.number().optional()
}).required()

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type DeleteBookingDto = z.infer<typeof deleteBookingSchema>;
export type ApproveBookingDto = z.infer<typeof approveBookingSchema>;
export type GetBookingDto = z.infer<typeof getBookingSchema>;
export type GetMyBookingsDto = z.infer<typeof getMyBookingsSchema>;



