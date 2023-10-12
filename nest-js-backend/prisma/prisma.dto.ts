import { User } from '@prisma/client';
import { Role } from 'src/auth/enums';
import { z } from 'zod';


export const userSchema = z.object({
    id: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string().email(),
    passwordHash: z.string().optional(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    luggages: z.array(z.unknown()).optional(),
    role: z.nativeEnum(Role),
});

export type UserDto = z.infer<typeof userSchema>;


