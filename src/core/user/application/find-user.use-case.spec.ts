import FindUserUseCase from '@/core/user/application/find-user.use-case'
import { FindUserCommand } from '@/core/user/application/types'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import gravatar from '@/lib/utils/gravatar'
import unexpected from '@/lib/utils/unexpected'

describe('FindUserUseCase', () => {
  test('should find a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const user = User.create(
      'test@example.com',
      ['ROLE_USER'],
      'Test User',
      gravatar('test@example.com'),
    )._unsafeUnwrap()
    userRepository.users.set('test@example.com', user)

    const findUserUseCase = new FindUserUseCase(userRepository)
    const findUserCommand = new FindUserCommand('test@example.com')

    // Act
    const result = await findUserUseCase.with(findUserCommand)

    // Assert
    result.match(
      (_user) => {
        expect(_user).toEqual({
          email: 'test@example.com',
          image: gravatar('test@example.com'),
          name: 'Test User',
          roles: ['ROLE_USER'],
        })
      },
      (error) => {
        unexpected.error(error)
      },
    )
  })

  test('should handle not finding a user by email', async () => {
    // Arrange
    const userRepository = new UsersInMemory()

    const findUserUseCase = new FindUserUseCase(userRepository)
    const findUserCommand = new FindUserCommand('nonexistent@example.com')

    // Act
    const result = await findUserUseCase.with(findUserCommand)

    // Assert
    result.match(
      (_user) => {
        unexpected.success(_user)
      },
      (error) => {
        expect(error).toBeInstanceOf(UserNotFoundError)
      },
    )
  })
})
