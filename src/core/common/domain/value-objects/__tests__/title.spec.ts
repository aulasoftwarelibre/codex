import { describe, expect, it } from 'vitest'

import { Title } from '@/core/common/domain/value-objects/title'

describe('Title', () => {
  describe('create', () => {
    it('should create a Title instance with a valid title', () => {
      // Arrange
      const validTitle = 'A book title'

      // Act
      const fullName = Title.create(validTitle)

      // Assert
      expect(fullName).toBeInstanceOf(Title)
      expect(fullName.value).toBe(validTitle)
    })

    it('should return a DomainError for an invalid title', () => {
      // Arrange
      const invalidTitle = 'Jo' // Name length is less than 3

      // Act
      const result = () => Title.create(invalidTitle)

      // Assert
      expect(result).toThrowError()
    })

    it('should return a DomainError for an empty name', () => {
      // Arrange
      const emptyName = ''

      // Act
      const result = () => Title.create(emptyName)

      // Assert
      expect(result).toThrowError()
    })
  })
})
