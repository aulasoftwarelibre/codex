'use client'

import { Switch } from '@nextui-org/react'

import UserResponse from '@/core/user/dto/responses/user.response'
import enableUser from '@/core/user/infrastructure/actions/enable-user'

interface UsersTableCellActionProperties {
  user: UserResponse
}

export function UsersTableCellAction(
  properties: UsersTableCellActionProperties,
) {
  const { user } = properties
  const enabled = user.roles.includes('ROLE_MEMBER')
  if (user.roles.includes('ROLE_ADMIN')) {
    return null
  }

  const selectHandler = async (isSelected: boolean) => {
    await enableUser(user.email, isSelected)
  }

  return (
    <Switch defaultSelected={enabled} onValueChange={selectHandler}>
      Activar
    </Switch>
  )
}
