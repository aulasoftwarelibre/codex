'use server'

import { revalidateTag } from 'next/cache'

import EnableUserRequest from '@/core/user/dto/requests/enable-user.request'
import me from '@/core/user/infrastructure/actions/me'
import container from '@/lib/container'

export default async function enableUser(email: string, enable: boolean) {
  const user = await me()

  if (!user || !user.roles.includes('ROLE_ADMIN') || user.email === email) {
    return
  }

  await container.enableUser.with(EnableUserRequest.with({ email, enable }))
  revalidateTag('users')

  return
}
