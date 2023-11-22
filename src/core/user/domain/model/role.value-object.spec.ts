import Role from './role.value-object'

describe('Role', () => {
  test('should create a valid Role instance', () => {
    // Arrange
    const validRole = 'ROLE_USER'

    // Act
    const role = Role.create(validRole)

    // Assert
    expect(role).toBeInstanceOf(Role)
    expect(role.value).toBe(validRole)
  })

  test('should throw an error for an invalid role', () => {
    // Arrange
    const invalidRole = 'INVALID_ROLE'

    // Act & Assert
    expect(() => Role.create(invalidRole)).toThrowError(
      'Role must start with ROLE_',
    )
  })

  test('should throw an error for an empty role', () => {
    // Arrange
    const emptyRole = ''

    // Act & Assert
    expect(() => Role.create(emptyRole)).toThrowError(
      'Role must start with ROLE_',
    )
  })

  test('should throw an error for a role without ROLE_ prefix', () => {
    // Arrange
    const roleWithoutPrefix = 'USER'

    // Act & Assert
    expect(() => Role.create(roleWithoutPrefix)).toThrowError(
      'Role must start with ROLE_',
    )
  })
})
