import Role from '@/core/common/domain/value-objects/role'
import RoleError from '@/core/common/domain/value-objects/role/role.error'
import Roles from '@/core/common/domain/value-objects/roles'
import unexpected from '@/lib/utils/unexpected'

describe('Roles', () => {
  describe('create', () => {
    it('should create a valid Roles instance', () => {
      // Arrange
      const validRoleStrings = ['ROLE_USER', 'ROLE_ADMIN']

      // Act
      const result = Roles.create(validRoleStrings)

      // Assert
      result.match(
        (roles) => {
          expect(roles).toBeInstanceOf(Roles)
          expect(roles.has(new Role('ROLE_USER'))).toBeTruthy()
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return an error for invalid roles', () => {
      // Arrange
      const invalidRoleStrings = ['ROLE_USER', 'INVALID_ROLE', 'ROLE_ADMIN']

      // Act
      const result = Roles.create(invalidRoleStrings)

      // Assert
      result.match(
        (roles) => {
          unexpected.success(roles)
        },
        (error) => {
          expect(error).toBeInstanceOf(RoleError)
        },
      )
    })
  })
})
