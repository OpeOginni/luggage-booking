'use server'

import { authenticatedRequest, loginUser } from '@/api-service/auth.api'
import { getErrorMessage } from '@/lib/utils';
import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { z } from "zod";

export async function getUser() {
    const access_token = cookies().get('access_token')?.value

    if (!access_token) return null

    const user = await authenticatedRequest(access_token)

    return user;
    // ...
}

export async function handleLogin(formData: FormData) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const parsed = schema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    try {
        const access_token = await loginUser(parsed.email, parsed.password);

        if (!access_token) {
            throw new Error("Invalid credentials");
        }

        cookies().set("access_token", access_token);
        // return revalidatePath('/')

    } catch (error) {
        return { error: getErrorMessage(error) }
    }
}
