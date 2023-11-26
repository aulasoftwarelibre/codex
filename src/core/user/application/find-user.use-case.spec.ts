import FindUserUseCase from '@/core/user/application/find-user.use-case'
import { FindUserCommand, UserDTO } from '@/core/user/application/types'
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
      UserDTO.with({
        email: 'test@example.com',
        image: gravatar('test@example.com'),
        name: 'Test User',
        roles: ['ROLE_USER'],
      }),
    )._unsafeUnwrap()

    userRepository.users.set('test@example.com', user)

    const findUserUseCase = new FindUserUseCase(userRepository)
    const findUserCommand = FindUserCommand.with({
      email: 'test@example.com',
    })
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
    const findUserCommand = FindUserCommand.with({
      email: 'nonexistent@example.com',
    })

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
