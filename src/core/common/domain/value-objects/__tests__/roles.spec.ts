import { describe, expect, it } from 'vitest'

import DomainError from '@/core/common/domain/errors/domain-error'
import Role from '@/core/common/domain/value-objects/role'
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
          expect(error).toBeInstanceOf(DomainError)
        },
      )
    })
  })

  describe('add', () => {
    it('should add a role to the Roles instance', () => {
      // Arrange
      const roles = new Roles([new Role('ROLE_USER'), new Role('ROLE_ADMIN')])
      const newRole = new Role('NEW_ROLE')

      // Act
      const result = roles.add(newRole)

      // Assert
      expect(result).toBeInstanceOf(Roles)
      expect(result.has(newRole)).toBeTruthy()
    })

    it('should not add a duplicate role to the Roles instance', () => {
      // Arrange
      const roles = new Roles([new Role('ROLE_USER'), new Role('ROLE_ADMIN')])
      const existingRole = new Role('ROLE_USER')

      // Act
      const result = roles.add(existingRole)

      // Assert
      expect(result).toBe(roles) // The instance should remain unchanged
    })
  })

  describe('remove', () => {
    it('should remove a role from the Roles instance', () => {
      // Arrange
      const roles = new Roles([new Role('ROLE_USER'), new Role('ROLE_ADMIN')])
      const roleToRemove = new Role('ROLE_USER')

      // Act
      const result = roles.remove(roleToRemove)

      // Assert
      expect(result).toBeInstanceOf(Roles)
      expect(result.has(roleToRemove)).toBeFalsy()
    })

    it('should not change the Roles instance if the role to remove is not present', () => {
      // Arrange
      const roles = new Roles([new Role('ROLE_USER'), new Role('ROLE_ADMIN')])
      const roleNotPresent = new Role('NEW_ROLE')

      // Act
      const result = roles.remove(roleNotPresent)

      // Assert
      expect(result).toBe(roles) // The instance should remain unchanged
    })
  })
})
