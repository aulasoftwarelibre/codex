import { describe, expect, it } from 'vitest'

import { FindUserRequest } from '@/core/user/dto/requests/find-user.request'
import { container } from '@/lib/container'
import { createUser } from '@/tests/examples/factories'
import { UsersExamples } from '@/tests/examples/users.examples'

describe('FindUserUseCase', () => {
  it('should find a user by email', async () => {
    // Arrange
    const user = await createUser(UsersExamples.basic())
    const request = FindUserRequest.with({
      email: user.email.value,
    })

    // Act
    const _user = await container.findUser.with(request)

    // Assert
    expect(_user).toEqual({
      email: user.email.value,
      id: user.id.value,
      image: user.image.value,
      name: user.name.value,
      roles: user.roles.map((role) => role.value),
    })
  })

  it('should handle not finding a user by email', async () => {
    // Arrange
    const request = FindUserRequest.with({
      email: 'nonexistent@example.com',
    })

    // Act
    const result = async () => await container.findUser.with(request)

    // Assert
    expect(result).rejects.toThrowError()
  })
})
