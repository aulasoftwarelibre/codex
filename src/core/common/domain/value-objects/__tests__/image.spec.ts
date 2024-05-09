import { describe, expect, it } from 'vitest'

import { Image } from '@/core/common/domain/value-objects/image'

describe('Image', () => {
  describe('create', () => {
    it('should create an Image instance with a valid URL', () => {
      // Arrange
      const validUrl = 'https://example.com/image.jpg'

      // Act
      const image = Image.create(validUrl)

      // Assert
      expect(image).toBeInstanceOf(Image)
      expect(image.value).toBe(validUrl)
    })

    it('should return an DomainError for an invalid URL', () => {
      // Arrange
      const invalidUrl = 'invalid-url' // Invalid format

      // Act
      const result = () => Image.create(invalidUrl)

      // Assert
      expect(result).toThrowError()
    })

    it('should return an DomainError for an empty URL', () => {
      // Arrange
      const emptyUrl = ''

      // Act
      const result = () => Image.create(emptyUrl)

      // Assert
      expect(result).toThrowError()
    })
  })
})
