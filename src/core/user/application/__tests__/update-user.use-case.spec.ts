import { describe, expect, it } from 'vitest'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UpdateUserRequest from '@/core/user/dto/requests/update-user.request'
import UserResponse from '@/core/user/dto/responses/user.response'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import gravatar from '@/lib/utils/gravatar'
import unexpected from '@/lib/utils/unexpected'
import UsersExamples from '@/tests/examples/users.examples'

describe('UpdateUserUseCase', () => {
  it('should update user name by email', async () => {
    // Arrange
    const user = UsersExamples.basic()
    const users = new UsersInMemory([user])

    const useCase = new UpdateUserUseCase(users)
    const request = UpdateUserRequest.with({
      ...UserResponse.fromModel(user),
      name: 'Updated User',
    })

    // Act
    const result = await useCase.with(request)

    // Assert
    result.match(
      () => {
        const updatedUser = users.users.get(user.id.value)
        expect(updatedUser?.name.value).toEqual('Updated User')
      },
      (error) => unexpected.error(error),
    )
  })

  it('should handle updating a non-existent user', async () => {
    // Arrange
    const user = UsersExamples.basic()
    const users = new UsersInMemory([user])

    const useCase = new UpdateUserUseCase(users)
    const request = UpdateUserRequest.with({
      email: 'nonexistent@example.com',
      image: gravatar('nonexistent@example.com'),
      name: 'Updated User',
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
