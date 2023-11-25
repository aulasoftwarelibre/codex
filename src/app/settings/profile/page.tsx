import { redirect } from 'next/navigation'

import EditProfileForm from '@/components/edit-profile-form'
import { FindUserResponse } from '@/core/user/application/types'
import { findUser } from '@/core/user/infrastructure/actions'
import { auth } from '@/lib/auth/auth'

export default async function Page() {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    return redirect('/')
  }

  const user = (await findUser(email)) as FindUserResponse

  return (
    <>
      <EditProfileForm user={user} />
    </>
  )
}
