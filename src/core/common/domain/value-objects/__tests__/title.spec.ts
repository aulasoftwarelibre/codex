import { describe, expect, it } from 'vitest'

import { DomainError } from '@/core/common/domain/errors/domain-error'
import { Title } from '@/core/common/domain/value-objects/title'
import { unexpected } from '@/lib/utils/unexpected'

describe('Title', () => {
  describe('create', () => {
    it('should create a Title instance with a valid title', () => {
      // Arrange
      const validTitle = 'A book title'

      // Act
      const result = Title.create(validTitle)

      // Assert
      result.match(
        (fullName) => {
          expect(fullName).toBeInstanceOf(Title)
          expect(fullName.value).toBe(validTitle)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return a DomainError for an invalid title', () => {
      // Arrange
      const invalidTitle = 'Jo' // Name length is less than 3

      // Act
      const result = Title.create(invalidTitle)

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

    it('should return a DomainError for an empty name', () => {
      // Arrange
      const emptyName = ''

      // Act
      const result = Title.create(emptyName)

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
