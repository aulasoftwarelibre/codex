import { describe, expect, it } from 'vitest'

import { FullName } from '@/core/common/domain/value-objects/fullname'

describe('FullName', () => {
  describe('create', () => {
    it('should create a FullName instance with a valid name', () => {
      // Arrange
      const validName = 'John Doe'

      // Act
      const fullName = FullName.create(validName)

      // Assert
      expect(fullName).toBeInstanceOf(FullName)
      expect(fullName.value).toBe(validName)
    })

    it('should return a FullNameError for an long name', () => {
      // Arrange
      const invalidName = 'A'.repeat(65)

      // Act
      const result = () => FullName.create(invalidName)

      // Assert
      expect(result).toThrowError()
    })

    it('should return a FullNameError for an empty name', () => {
      // Arrange
      const emptyName = ''

      // Act
      const result = () => FullName.create(emptyName)

      // Assert
      expect(result).toThrowError()
    })
  })
})
