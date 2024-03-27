import { describe, expect, it } from 'vitest'

import { EnableUserRequest } from '@/core/user/dto/requests/enable-user.request'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { unexpected } from '@/lib/utils/unexpected'
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
    const result = await container.enableUser.with(request)

    // Assert
    result.match(
      async () => {
        const updatedUser = await prisma.user.findFirst({
          where: { id: user.id.value },
        })
        expect(updatedUser?.roles.includes('ROLE_MEMBER')).toBeTruthy()
      },
      (error) => unexpected.error(error),
    )
  })

  it('should disable a user', async () => {
    // Arrange
    const user = await createUser(UsersExamples.member())
    const request = EnableUserRequest.with({
      email: user.email.value,
      enable: false,
    })

    // Act
    const result = await container.enableUser.with(request)

    // Assert
    result.match(
      async () => {
        const updatedUser = await prisma.user.findFirst({
          where: { id: user.id.value },
        })
        expect(updatedUser?.roles.includes('ROLE_MEMBER')).toBeFalsy()
      },
      (error) => unexpected.error(error),
    )
  })
})
