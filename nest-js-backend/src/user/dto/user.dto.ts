import { TransportType } from 'src/auth/enums';
import { z } from 'zod';

export const updateUserSchema = z
    .object({
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;