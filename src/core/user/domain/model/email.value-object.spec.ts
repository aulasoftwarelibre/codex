import Email from './email.value-object'

describe('Email', () => {
  test('should create a valid Email instance', () => {
    // Arrange
    const validEmail = 'test@example.com'

    // Act
    const email = Email.create(validEmail)

    // Assert
    expect(email).toBeInstanceOf(Email)
    expect(email.value).toBe(validEmail)
  })

  test('should throw an error for an empty email', () => {
    // Arrange
    const emptyEmail = ''

    // Act & Assert
    expect(() => Email.create(emptyEmail)).toThrow('Invalid email address')
  })

  test('should throw an error for an invalid email format', () => {
    // Arrange
    const invalidEmail = 'invalid-email'

    // Act & Assert
    expect(() => Email.create(invalidEmail)).toThrow('Invalid email address')
  })

  test('should throw an error for an email with spaces', () => {
    // Arrange
    const emailWithSpaces = 'test @ example.com'

    // Act & Assert
    expect(() => Email.create(emailWithSpaces)).toThrow('Invalid email address')
  })

  test('should throw an error for an email without the "@" symbol', () => {
    // Arrange
    const emailWithoutAtSymbol = 'testexample.com'

    // Act & Assert
    expect(() => Email.create(emailWithoutAtSymbol)).toThrow(
      'Invalid email address',
    )
  })

  test('should throw an error for an email without the domain part', () => {
    // Arrange
    const emailWithoutDomain = 'test@.com'

    // Act & Assert
    expect(() => Email.create(emailWithoutDomain)).toThrow(
      'Invalid email address',
    )
  })
})
