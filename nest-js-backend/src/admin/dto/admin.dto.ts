import { z } from 'zod';

export const createSuperRoleSchema = z
    .object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .required()

export type CreateSuperRoleDto = z.infer<typeof createSuperRoleSchema>;