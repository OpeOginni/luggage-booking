import { TransportType } from 'src/auth/enums';
import { z } from 'zod';

export const createTrasportSchema = z
    .object({
        departure: z.string(),
        transportCode: z.string(),
        transportType: z.nativeEnum(TransportType),
        destination: z.string(),
        maxBookingSlots: z.number(),
    })
    .required();

export type CreateTransportDto = z.infer<typeof createTrasportSchema>;