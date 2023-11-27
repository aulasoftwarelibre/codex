import { redirect } from 'next/navigation'

import EditProfileForm from '@/components/edit-profile-form'
import UserResponse from '@/core/user/dto/responses/user.response'
import { findUser } from '@/core/user/infrastructure/actions/find-user'
import { auth } from '@/lib/auth/auth'

export default async function Page() {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    return redirect('/')
  }

  const user = (await findUser(email)) as UserResponse

  return (
    <>
      <EditProfileForm user={user} />
    </>
  )
}
