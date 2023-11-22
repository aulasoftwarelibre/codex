import { FindUserError, UpdateUserCommand } from '@/core/user/application/types'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import gravatar from '@/lib/utils/gravatar'

describe('UpdateUserUseCase', () => {
  test('should update user name by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const email = 'test@example.com'
    const name = 'Test User'
    const image = gravatar(email)
    const updatedName = 'Updated User'

    const user = User.create(name, [], email, image)

    await userRepository.save(user)

    const updateUserCommand = new UpdateUserCommand(updatedName, email, image)

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)
    const updatedUser = await userRepository.findByEmail(email)

    // Assert
    expect(result._unsafeUnwrap()).toEqual(true)
    expect(updatedUser?.name).toEqual(updatedName)
  })

  test('should handle updating a non-existent user', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const email = 'nonexistent@example.com'
    const image = gravatar(email)
    const updatedName = 'Updated User'

    const updateUserCommand = new UpdateUserCommand(updatedName, email, image)

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)

    // Assert
    expect(result._unsafeUnwrapErr()).toEqual(
      FindUserError.causeNotFound(email),
    )
  })
})
