import { describe, expect, it } from 'vitest'

import { Role } from '@/core/common/domain/value-objects/role'

describe('Role', () => {
  describe('create', () => {
    it('should create a Role instance with a valid role', () => {
      // Arrange
      const validRole = 'ROLE_USER'

      // Act
      const role = Role.create(validRole)

      // Assert
      expect(role).toBeInstanceOf(Role)
      expect(role.value).toBe(validRole)
    })

    it('should return a DomainError for an invalid role', () => {
      // Arrange
      const invalidRole = 'USER_ROLE' // Invalid format

      // Act
      const result = () => Role.create(invalidRole)

      // Assert
      expect(result).toThrowError()
    })

    it('should return a DomainError for an empty role', () => {
      // Arrange
      const emptyRole = ''

      // Act
      const result = () => Role.create(emptyRole)

      // Assert
      expect(result).toThrowError()
    })
  })
})
