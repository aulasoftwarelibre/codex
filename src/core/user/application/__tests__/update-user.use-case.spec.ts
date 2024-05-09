import { describe, expect, it } from 'vitest'

import { UpdateUserRequest } from '@/core/user/dto/requests/update-user.request'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { container } from '@/lib/container'
import { prisma } from '@/lib/prisma/prisma'
import { gravatar } from '@/lib/utils/gravatar'
import { createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('UpdateUserUseCase', () => {
  it('should update user name by email', async () => {
    // Arrange
    const user = await createUser(UsersExamples.basic())
    const request = UpdateUserRequest.with({
      ...UserResponse.fromModel(user),
      name: 'Updated User',
    })

    // Act
    await container.updateUser.with(request)

    // Assert
    const updatedUser = await prisma.user.findFirst({
      where: {
        id: user.id.value,
      },
    })
    expect(updatedUser?.name).toEqual('Updated User')
  })

  it('should handle updating a non-existent user', async () => {
    // Arrange
    const request = UpdateUserRequest.with({
      email: 'nonexistent@example.com',
      image: gravatar('nonexistent@example.com'),
      name: 'Updated User',
    })

    // Act
    const result = async () => await container.updateUser.with(request)

    // Assert
    expect(result).rejects.toThrowError()
  })
})
