import { z } from 'zod';

export const createTrasportSchema = z
    .object({
        departure: z.string(),
    })
    .required();

export type CreateTransportDto = z.infer<typeof createTrasportSchema>;