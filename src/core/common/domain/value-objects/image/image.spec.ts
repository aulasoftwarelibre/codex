import Image from '@/core/common/domain/value-objects/image'
import ImageError from '@/core/common/domain/value-objects/image/image.error'
import unexpected from '@/lib/utils/unexpected'

describe('Image', () => {
  describe('create', () => {
    test('should create an Image instance with a valid URL', () => {
      // Arrange
      const validUrl = 'https://example.com/image.jpg'

      // Act
      const result = Image.create(validUrl)

      // Assert
      result.match(
        (image) => {
          expect(image).toBeInstanceOf(Image)
          expect(image.value).toBe(validUrl)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    test('should return an ImageError for an invalid URL', () => {
      // Arrange
      const invalidUrl = 'invalid-url' // Invalid format

      // Act
      const result = Image.create(invalidUrl)

      // Assert
      result.match(
        (image) => {
          unexpected.success(image)
        },
        (error) => {
          expect(error).toBeInstanceOf(ImageError)
        },
      )
    })

    test('should return an ImageError for an empty URL', () => {
      // Arrange
      const emptyUrl = ''

      // Act
      const result = Image.create(emptyUrl)

      // Assert
      result.match(
        (image) => {
          unexpected.success(image)
        },
        (error) => {
          expect(error).toBeInstanceOf(ImageError)
        },
      )
    })
  })
})
