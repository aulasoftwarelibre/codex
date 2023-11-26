import Role from '@/core/common/domain/value-objects/role'
import RoleError from '@/core/common/domain/value-objects/role/role.error'
import unexpected from '@/lib/utils/unexpected'

describe('Role', () => {
  describe('create', () => {
    test('should create a Role instance with a valid role', () => {
      // Arrange
      const validRole = 'ROLE_USER'

      // Act
      const result = Role.create(validRole)

      // Assert
      result.match(
        (role) => {
          expect(role).toBeInstanceOf(Role)
          expect(role.value).toBe(validRole)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    test('should return a RoleError for an invalid role', () => {
      // Arrange
      const invalidRole = 'USER_ROLE' // Invalid format

      // Act
      const result = Role.create(invalidRole)

      // Assert
      result.match(
        (role) => {
          unexpected.success(role)
        },
        (error) => {
          expect(error).toBeInstanceOf(RoleError)
        },
      )
    })

    test('should return a RoleError for an empty role', () => {
      // Arrange
      const emptyRole = ''

      // Act
      const result = Role.create(emptyRole)

      // Assert
      result.match(
        (role) => {
          unexpected.success(role)
        },
        (error) => {
          expect(error).toBeInstanceOf(RoleError)
        },
      )
    })
  })
})
