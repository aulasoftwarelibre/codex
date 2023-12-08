import { describe, expect, it } from 'vitest'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import FindUserUseCase from '@/core/user/application/find-user.use-case'
import FindUserRequest from '@/core/user/dto/requests/find-user.request'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import UsersExamples from '@/tests/examples/users.examples'

describe('FindUserUseCase', () => {
  it('should find a user by email', async () => {
    // Arrange
    const user = UsersExamples.basic()
    const users = new UsersInMemory([user])

    const useCase = new FindUserUseCase(users)
    const request = FindUserRequest.with({
      email: user.email.value,
    })

    // Act
    const result = await useCase.with(request)

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
    const userRepository = new UsersInMemory([])

    const useCase = new FindUserUseCase(userRepository)
    const request = FindUserRequest.with({
      email: 'nonexistent@example.com',
    })

    // Act
    const result = await useCase.with(request)

    // Assert
    result.match(
      (_user) => unexpected.success(_user),
      (error) => {
        expect(error).toBeInstanceOf(NotFoundError)
      },
    )
  })
})
