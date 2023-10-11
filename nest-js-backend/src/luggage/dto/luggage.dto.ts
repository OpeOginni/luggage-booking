import { z } from 'zod';

export const createLuggageSchema = z
    .object({
        size: z.number().min(0.1),
        images: z.array(z.string()).optional(),
        items: z.array(z.string()),
        transportId: z.number(),
        dangerousItems: z.boolean(),
        recieverName: z.string(),
    })
    .required();

export const updateLuggageSchema = z
    .object({
        luggageId: z.number(),
        size: z.number().min(0.1).optional(),
        images: z.array(z.string()).optional(),
        items: z.array(z.string()).optional(),
        dangerousItems: z.boolean().optional(),
        recieverName: z.string().optional(), transportId: z.number().optional(),
    }).required()

export const deleteLuggageSchema = z
    .object({
        luggageId: z.number(),
    }).required()


export type CreateLuggageDto = z.infer<typeof createLuggageSchema>;

export type UpdateLuggageDto = z.infer<typeof updateLuggageSchema>;

export type DeleteLuggageDto = z.infer<typeof deleteLuggageSchema>;
