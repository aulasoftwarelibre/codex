import { redirect } from 'next/navigation'

import EditProfileForm from '@/components/EditProfileForm/EditProfileForm'
import { findUser, updateUser } from '@/core/user/infrastructure/actions'
import { auth } from '@/lib/auth/auth'

export default async function Page() {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }

  const user = await findUser(session.user?.email as string)

  return (
    <>
      <EditProfileForm user={user} update={updateUser} />
    </>
  )
}
