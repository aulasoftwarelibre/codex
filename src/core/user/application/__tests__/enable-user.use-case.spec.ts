import { describe, expect, it } from 'vitest'

import { EnableUserRequest } from '@/core/user/dto/requests/enable-user.request'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('EnableUserUseCase', () => {
  it('should enable a user', async () => {
    // Arrange
    const user = await createUser(UsersExamples.basic())
    const request = EnableUserRequest.with({
      email: user.email.value,
      enable: true,
    })

    // Act
    await container.enableUser.with(request)

    // Assert
    const updatedUser = await prisma.user.findFirst({
      where: { id: user.id.value },
    })
    expect(updatedUser?.roles.includes('ROLE_MEMBER')).toBeTruthy()
  })

  it('should disable a user', async () => {
    // Arrange
    const user = await createUser(UsersExamples.member())
    const request = EnableUserRequest.with({
      email: user.email.value,
      enable: false,
    })

    // Act
    await container.enableUser.with(request)

    // Assert
    const updatedUser = await prisma.user.findFirst({
      where: { id: user.id.value },
    })
    expect(updatedUser?.roles.includes('ROLE_MEMBER')).toBeFalsy()
  })
})
