import { describe, expect, it } from 'vitest'

import DomainError from '@/core/common/domain/errors/domain-error'
import FullName from '@/core/common/domain/value-objects/fullname'
import unexpected from '@/lib/utils/unexpected'

describe('FullName', () => {
  describe('create', () => {
    it('should create a FullName instance with a valid name', () => {
      // Arrange
      const validName = 'John Doe'

      // Act
      const result = FullName.create(validName)

      // Assert
      result.match(
        (fullName) => {
          expect(fullName).toBeInstanceOf(FullName)
          expect(fullName.value).toBe(validName)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return a FullNameError for an invalid name', () => {
      // Arrange
      const invalidName = 'Jo' // Name length is less than 3

      // Act
      const result = FullName.create(invalidName)

      // Assert
      result.match(
        (fullName) => {
          unexpected.success(fullName)
        },
        (error) => {
          expect(error).toBeInstanceOf(DomainError)
        },
      )
    })

    it('should return a FullNameError for an empty name', () => {
      // Arrange
      const emptyName = ''

      // Act
      const result = FullName.create(emptyName)

      // Assert
      result.match(
        (fullName) => {
          unexpected.success(fullName)
        },
        (error) => {
          expect(error).toBeInstanceOf(DomainError)
        },
      )
    })
  })
})
