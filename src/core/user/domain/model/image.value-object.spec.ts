import Image from './image.value-object'

describe('Image', () => {
  test('should create a valid Image instance', () => {
    // Arrange
    const validImageUrl = 'https://example.com/image.jpg'

    // Act
    const image = Image.create(validImageUrl)

    // Assert
    expect(image).toBeInstanceOf(Image)
    expect(image.value).toBe(validImageUrl)
  })

  test('should create an empty Image instance for an empty string', () => {
    // Arrange
    const emptyImageUrl = ''

    // Act
    const image = Image.create(emptyImageUrl)

    // Assert
    expect(image).toBeInstanceOf(Image)
    expect(image.value).toBe('')
  })

  test('should throw an error for an invalid URL', () => {
    // Arrange
    const invalidImageUrl = 'not_a_url'

    // Act & Assert
    expect(() => Image.create(invalidImageUrl)).toThrow('Invalid URL')
  })

  test('should throw an error for a URL without a protocol', () => {
    // Arrange
    const urlWithoutProtocol = 'example.com/image.jpg'

    // Act & Assert
    expect(() => Image.create(urlWithoutProtocol)).toThrow('Invalid URL')
  })
})
