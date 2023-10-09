import { z } from 'zod';

export const createLuggageSchema = z
    .object({
        size: z.number().min(0.1),
        images: z.array(z.string()).optional(),
        items: z.array(z.string()),
        manned: z.boolean(),
        transportId: z.number()
    })
    .required();

export const updateLuggageSchema = z
    .object({
        luggageId: z.number(),
        size: z.number().min(0.1).optional(),
        images: z.array(z.string()).optional(),
        items: z.array(z.string()).optional(),
        manned: z.boolean().optional(),
        transportId: z.number().optional(),
    }).required()


export type CreateLuggageDto = z.infer<typeof createLuggageSchema>;

export type UpdateLuggageDto = z.infer<typeof updateLuggageSchema>;