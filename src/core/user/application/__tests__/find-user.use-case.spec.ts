import { describe, expect, it } from 'vitest'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import FindUserRequest from '@/core/user/dto/requests/find-user.request'
import container from '@/lib/container'
import unexpected from '@/lib/utils/unexpected'
import { createUser } from '@/tests/examples/factories'
import UsersExamples from '@/tests/examples/users.examples'

describe('FindUserUseCase', () => {
  it('should find a user by email', async () => {
    // Arrange
    const user = await createUser(UsersExamples.basic())
    const request = FindUserRequest.with({
      email: user.email.value,
    })

    // Act
    const result = await container.findUser.with(request)

    // Assert
    result.match(
      (_user) => {
        expect(_user).toEqual({
          email: user.email.value,
          id: user.id.value,
          image: user.image.value,
          name: user.name.value,
          roles: user.roles.map((role) => role.value),
        })
      },
      (error) => unexpected.error(error),
    )
  })

  it('should handle not finding a user by email', async () => {
    // Arrange
    const request = FindUserRequest.with({
      email: 'nonexistent@example.com',
    })

    // Act
    const result = await container.findUser.with(request)

    // Assert
    result.match(
      (_user) => unexpected.success(_user),
      (error) => {
        expect(error).toBeInstanceOf(NotFoundError)
      },
    )
  })
})
