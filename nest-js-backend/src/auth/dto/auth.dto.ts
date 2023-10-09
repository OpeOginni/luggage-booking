

import { z } from 'zod';

export const createAuthSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    .required();

export const AuthSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    .required();

export type CreateAuthDto = z.infer<typeof createAuthSchema>;

export type AuthDto = z.infer<typeof AuthSchema>;