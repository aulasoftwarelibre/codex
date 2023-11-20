import { FindUserError, UpdateUserCommand } from '@/core/user/application/types'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'

describe('UpdateUserUseCase', () => {
  test('should update user name by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const userEmail = 'test@example.com'
    const userName = 'Test User'
    const updatedName = 'Updated User'

    const user = User.create(userName, [], userEmail)

    await userRepository.save(user)

    const updateUserCommand = new UpdateUserCommand(updatedName, userEmail)

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)
    const updatedUser = await userRepository.findByEmail(userEmail)

    // Assert
    expect(result._unsafeUnwrap()).toEqual(true)
    expect(updatedUser?.name).toEqual(updatedName)
  })

  test('should handle updating a non-existent user', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const userEmail = 'nonexistent@example.com'
    const updatedName = 'Updated User'

    const updateUserCommand = new UpdateUserCommand(updatedName, userEmail)

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)

    // Assert
    expect(result._unsafeUnwrapErr()).toEqual(
      FindUserError.causeNotFound(userEmail),
    )
  })
})
