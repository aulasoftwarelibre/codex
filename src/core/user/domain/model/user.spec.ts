import Role from '@/core/common/domain/value-objects/role'
import { UserDTO } from '@/core/user/application/types'
import User from '@/core/user/domain/model/user.entity'
import gravatar from '@/lib/utils/gravatar'
import unexpected from '@/lib/utils/unexpected'

describe('User', () => {
  describe('create', () => {
    it('should create a valid user', () => {
      // Arrange
      // Act
      const user = User.create(
        UserDTO.with({
          email: 'admin@example.com',
          image: gravatar('admin@example.com'),
          name: 'Sergio',
          roles: ['ROLE_USER'],
        }),
      )

      // Assert
      user.match(
        (_user) => {
          expect(_user.name.value).toEqual('Sergio')
          expect(_user.roles.has(new Role('ROLE_USER'))).toBeTruthy()
          expect(_user.email.value).toEqual('admin@example.com')
          expect(_user.image.value).toEqual(gravatar('admin@example.com'))
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return an error for an invalid email', () => {
      // Arrange
      const invalidEmail = 'invalid-email'
      // Act
      const user = User.create(
        UserDTO.with({
          email: invalidEmail,
          image: gravatar(invalidEmail),
          name: 'Sergio',
          roles: ['ROLE_USER'],
        }),
      )

      // Assert
      user.match(
        (_user) => {
          unexpected.success(_user)
        },
        (error) => {
          expect(error).toBeDefined()
        },
      )
    })

    it('should return an error for an empty name', () => {
      // Arrange
      const emptyName = ''
      // Act
      const user = User.create(
        UserDTO.with({
          email: 'admin@example.com',
          image: gravatar('admin@example.com'),
          name: emptyName,
          roles: ['ROLE_USER'],
        }),
      )
      // Assert
      user.match(
        (_user) => {
          unexpected.success(_user)
        },
        (error) => {
          expect(error).toBeDefined()
        },
      )
    })

    it('should return an error for an invalid role', () => {
      // Arrange
      const invalidRole = 'INVALID_ROLE'
      // Act
      const user = User.create(
        UserDTO.with({
          email: 'admin@example.com',
          image: gravatar('admin@example.com'),
          name: 'Sergio',
          roles: [invalidRole],
        }),
      )
      // Assert
      user.match(
        (_user) => {
          unexpected.success(_user)
        },
        (error) => {
          expect(error).toBeDefined()
        },
      )
    })
  })
})
