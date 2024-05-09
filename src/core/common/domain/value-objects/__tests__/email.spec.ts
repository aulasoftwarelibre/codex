import { describe, expect, it } from 'vitest'

import { Email } from '@/core/common/domain/value-objects/email'

describe('Email', () => {
  describe('create', () => {
    it('should create an Email instance with a valid email', () => {
      // Arrange
      const validEmail = 'john.doe@example.com'

      // Act
      const email = Email.create(validEmail)

      // Assert
      expect(email).toBeInstanceOf(Email)
      expect(email.value).toBe(validEmail)
    })

    it('should return an EmailError for an invalid email format', () => {
      // Arrange
      const invalidEmail = 'invalid-email' // Invalid format

      // Act
      const result = () => Email.create(invalidEmail)

      // Assert
      expect(result).toThrowError()
    })

    it('should return an EmailError for an empty email', () => {
      // Arrange
      const emptyEmail = ''

      // Act
      const result = () => Email.create(emptyEmail)

      // Assert
      expect(result).toThrowError()
    })
  })
})
