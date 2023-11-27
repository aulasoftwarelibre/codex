import FindUserUseCase from '@/core/user/application/find-user.use-case'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import FindUserRequest from '@/core/user/dto/requests/find-user.request'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import unexpected from '@/lib/utils/unexpected'
import UsersExamples from '@/tests/examples/users.examples'

describe('FindUserUseCase', () => {
  test('should find a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const user = UsersExamples.basic()
    userRepository.users.set(user.email.value, user)

    const useCase = new FindUserUseCase(userRepository)
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
          image: user.image.value,
          name: user.name.value,
          roles: user.roles.map((role) => role.value),
        })
      },
      (error) => unexpected.error(error),
    )
  })

  test('should handle not finding a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()

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
        expect(error).toBeInstanceOf(UserNotFoundError)
      },
    )
  })
})
