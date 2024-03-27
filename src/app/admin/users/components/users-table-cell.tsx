'use client'

import { User } from '@nextui-org/react'
import { Key } from 'react'

import { UsersTableCellAction } from '@/app/admin/users/components/users-table-cell-action'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { gravatar } from '@/lib/utils/gravatar'

interface UsersTableCellProperties {
  columnKey: Key
  user: UserResponse
}

export function UsersTableCell(properties: UsersTableCellProperties) {
  const { columnKey, user } = properties

  switch (columnKey) {
    case 'email': {
      return (
        <User
          avatarProps={{ radius: 'lg', src: gravatar(user.email) }}
          description={user.email}
          name={user.name}
        >
          {user.email}
        </User>
      )
    }
    case 'roles': {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize pl-1">
            {user.roles.join(', ')}
          </p>
        </div>
      )
    }
    case 'actions': {
      return <UsersTableCellAction user={user} />
    }
    default: {
      return user[columnKey as keyof UserResponse]
    }
  }
}
