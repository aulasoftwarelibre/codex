import FindUserUseCase from '@/core/user/application/find-user.use-case'
import {
  FindUserCommand,
  FindUserError,
  FindUserResponse,
} from '@/core/user/application/types'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'

describe('FindUserUseCase', () => {
  test('should find a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const findUserUseCase = new FindUserUseCase(userRepository)

    const userEmail = 'test@example.com'
    const userName = 'Test User'
    const user = User.create(userName, [], userEmail)

    await userRepository.save(user)

    const findUserCommand = new FindUserCommand(userEmail)

    // Act
    const result = await findUserUseCase.with(findUserCommand)

    // Assert
    expect(result._unsafeUnwrap()).toEqual(
      new FindUserResponse(userName, userEmail),
    )
  })

  test('should handle not finding a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const findUserUseCase = new FindUserUseCase(userRepository)

    const userEmail = 'nonexistent@example.com'
    const findUserCommand = new FindUserCommand(userEmail)

    // Act
    const result = await findUserUseCase.with(findUserCommand)

    // Assert
    expect(result._unsafeUnwrapErr()).toEqual(
      FindUserError.causeNotFound(userEmail),
    )
  })
})
