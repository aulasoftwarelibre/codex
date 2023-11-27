import Role from '@/core/common/domain/value-objects/role'
import UserFactory from '@/core/user/domain/model/user.factory'
import UserResponse from '@/core/user/dto/responses/user.response'
import gravatar from '@/lib/utils/gravatar'
import unexpected from '@/lib/utils/unexpected'

describe('User', () => {
  describe('create', () => {
    it('should create a valid user', () => {
      // Arrange
      // Act
      const user = UserFactory.create(
        UserResponse.with({
          email: 'admin@example.com',
          image: gravatar('admin@example.com'),
          name: 'Jane Doe',
          roles: ['ROLE_USER'],
        }),
      )

      // Assert
      user.match(
        (_user) => {
          expect(_user.name.value).toEqual('Jane Doe')
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
      const user = UserFactory.create(
        UserResponse.with({
          email: invalidEmail,
          image: gravatar(invalidEmail),
          name: 'Jane Doe',
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
      const user = UserFactory.create(
        UserResponse.with({
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
      const user = UserFactory.create(
        UserResponse.with({
          email: 'admin@example.com',
          image: gravatar('admin@example.com'),
          name: 'Jane Doe',
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
