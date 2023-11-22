import Name from './name.value-object'

describe('Name', () => {
  test('should create a valid Name instance', () => {
    // Arrange
    const validName = 'John Doe'

    // Act
    const name = Name.create(validName)

    // Assert
    expect(name).toBeInstanceOf(Name)
    expect(name.value).toBe(validName)
  })

  test('should trim leading and trailing spaces from the name', () => {
    // Arrange
    const nameWithSpaces = '  John Doe  '

    // Act
    const name = Name.create(nameWithSpaces)

    // Assert
    expect(name).toBeInstanceOf(Name)
    expect(name.value).toBe('John Doe')
  })

  test('should throw an error for an empty name', () => {
    // Arrange
    const emptyName = ''

    // Act & Assert
    expect(() => Name.create(emptyName)).toThrow('Name cannot be empty')
  })

  test('should throw an error for a name with only spaces', () => {
    // Arrange
    const nameWithOnlySpaces = '    '

    // Act & Assert
    expect(() => Name.create(nameWithOnlySpaces)).toThrow(
      'Name cannot be empty',
    )
  })
})
