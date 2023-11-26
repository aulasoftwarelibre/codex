import { UpdateUserCommand, UserDTO } from '@/core/user/application/types'
import UpdateUserUseCase from '@/core/user/application/update-user.use-case'
import UserNotFoundError from '@/core/user/domain/errors/user-not-found.error'
import User from '@/core/user/domain/model/user.entity'
import UsersInMemory from '@/core/user/infrastructure/services/users-in-memory.repository'
import gravatar from '@/lib/utils/gravatar'
import unexpected from '@/lib/utils/unexpected'

describe('UpdateUserUseCase', () => {
  test('should update user name by email', async () => {
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

    const updatedName = 'Updated User'

    const updateUserCommand = UpdateUserCommand.with({
      email: 'test@example.com',
      image: gravatar('test@example.com'),
      name: updatedName,
    })
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)

    // Assert
    result.match(
      (expectedUser) => {
        expect(expectedUser.name.value).toEqual(updatedName)
        const updatedUser = userRepository.users.get('test@example.com')
        expect(updatedUser?.name.value).toEqual(updatedName)
      },
      (error) => {
        unexpected.error(error)
      },
    )
  })

  test('should handle updating a non-existent user', async () => {
    // Arrange
    const userRepository = new UsersInMemory()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)

    const email = 'nonexistent@example.com'
    const image = gravatar(email)
    const updatedName = 'Updated User'
    const updateUserCommand = UpdateUserCommand.with({
      email,
      image,
      name: updatedName,
    })

    // Act
    const result = await updateUserUseCase.with(updateUserCommand)

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
