'use server'

import UsersTable from '@/app/admin/users/_components/users-table/users-table'
import { findUsers } from '@/core/user/infrastructure/actions/find-users'

export default async function Page() {
  const users = await findUsers()
  return (
    <>
      <UsersTable users={users} />
    </>
  )
}
