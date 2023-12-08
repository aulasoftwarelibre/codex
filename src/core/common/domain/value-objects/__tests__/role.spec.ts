import { describe, expect, it } from 'vitest'

import DomainError from '@/core/common/domain/errors/domain-error'
import Role from '@/core/common/domain/value-objects/role'
import unexpected from '@/lib/utils/unexpected'

describe('Role', () => {
  describe('create', () => {
    it('should create a Role instance with a valid role', () => {
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

    it('should return a DomainError for an invalid role', () => {
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
          expect(error).toBeInstanceOf(DomainError)
        },
      )
    })

    it('should return a DomainError for an empty role', () => {
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
          expect(error).toBeInstanceOf(DomainError)
        },
      )
    })
  })
})
