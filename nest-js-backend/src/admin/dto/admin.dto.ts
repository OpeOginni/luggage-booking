import { Role } from 'src/auth/enums';
import { z } from 'zod';

export const createSuperRoleSchema = z
    .object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .required()

export const getAllUsersSchema = z.object({
    role: z.nativeEnum(Role).optional()
})


export const getUserSchema = z.object({
    userId: z.number()
})

export type CreateSuperRoleDto = z.infer<typeof createSuperRoleSchema>;
export type GetAllUsersDto = z.infer<typeof getAllUsersSchema>;
export type GetUserDto = z.infer<typeof getUserSchema>;