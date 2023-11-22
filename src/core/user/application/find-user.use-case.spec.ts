import FindUserUseCase from '@/core/user/application/find-user.use-case'
import { FindUserCommand, FindUserError } from '@/core/user/application/types'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import gravatar from '@/lib/utils/gravatar'

describe('FindUserUseCase', () => {
  test('should find a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const findUserUseCase = new FindUserUseCase(userRepository)

    const email = 'test@example.com'
    const name = 'Test User'
    const image = gravatar(email)
    const roles = ['ROLE_USER']
    const user = User.create(name, roles, email, image)

    await userRepository.save(user)

    const findUserCommand = new FindUserCommand(email)

    // Act
    const result = await findUserUseCase.with(findUserCommand)

    // Assert
    expect(result._unsafeUnwrap()).toEqual({ email, image, name, roles })
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
