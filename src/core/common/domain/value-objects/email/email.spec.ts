import { describe, expect, it } from 'vitest'

import Email from '@/core/common/domain/value-objects/email'
import EmailError from '@/core/common/domain/value-objects/email/email.error'
import unexpected from '@/lib/utils/unexpected'

describe('Email', () => {
  describe('create', () => {
    it('should create an Email instance with a valid email', () => {
      // Arrange
      const validEmail = 'john.doe@example.com'

      // Act
      const result = Email.create(validEmail)

      // Assert
      result.match(
        (email) => {
          expect(email).toBeInstanceOf(Email)
          expect(email.value).toBe(validEmail)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return an EmailError for an invalid email format', () => {
      // Arrange
      const invalidEmail = 'invalid-email' // Invalid format

      // Act
      const result = Email.create(invalidEmail)

      // Assert
      result.match(
        (email) => {
          unexpected.success(email)
        },
        (error) => {
          expect(error).toBeInstanceOf(EmailError)
        },
      )
    })

    it('should return an EmailError for an empty email', () => {
      // Arrange
      const emptyEmail = ''

      // Act
      const result = Email.create(emptyEmail)

      // Assert
      result.match(
        (email) => {
          unexpected.success(email)
        },
        (error) => {
          expect(error).toBeInstanceOf(EmailError)
        },
      )
    })
  })
})
