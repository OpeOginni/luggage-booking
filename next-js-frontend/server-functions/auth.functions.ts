'use server'

import { authenticatedRequest } from '@/api-service/auth.api'
import { cookies } from 'next/headers'

export async function getUser() {
    const access_token = cookies().get('access_token')?.value

    if (!access_token) return null

    const user = await authenticatedRequest(access_token)

    return user;
    // ...
}