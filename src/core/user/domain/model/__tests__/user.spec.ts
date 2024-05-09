import { ulid } from 'ulid'
import { describe, expect, it } from 'vitest'

import { Role } from '@/core/common/domain/value-objects/role'
import { UserFactory } from '@/core/user/domain/model/user.factory'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { gravatar } from '@/lib/utils/gravatar'

describe('User', () => {
  describe('create', () => {
    it('should create a valid user', () => {
      // Arrange
      // Act
      const user = UserFactory.create(
        UserResponse.with({
          email: 'admin@example.com',
          id: ulid(),
          image: gravatar('admin@example.com'),
          name: 'Jane Doe',
          roles: ['ROLE_USER'],
        }),
      )

      // Assert
      expect(user.name.value).toEqual('Jane Doe')
      expect(user.roles.has(new Role('ROLE_USER'))).toBeTruthy()
      expect(user.email.value).toEqual('admin@example.com')
      expect(user.image.value).toEqual(gravatar('admin@example.com'))
    })

    it('should return an error for an invalid email', () => {
      // Arrange
      const invalidEmail = 'invalid-email'
      // Act
      const user = () =>
        UserFactory.create(
          UserResponse.with({
            email: invalidEmail,
            id: ulid(),
            image: gravatar(invalidEmail),
            name: 'Jane Doe',
            roles: ['ROLE_USER'],
          }),
        )

      // Assert
      expect(user).toThrowError()
    })

    it('should return an error for an empty name', () => {
      // Arrange
      const emptyName = ''
      // Act
      const user = () =>
        UserFactory.create(
          UserResponse.with({
            email: 'admin@example.com',
            id: ulid(),
            image: gravatar('admin@example.com'),
            name: emptyName,
            roles: ['ROLE_USER'],
          }),
        )
      // Assert
      expect(user).toThrowError()
    })

    it('should return an error for an invalid role', () => {
      // Arrange
      const invalidRole = 'INVALID_ROLE'
      // Act
      const user = () =>
        UserFactory.create(
          UserResponse.with({
            email: 'admin@example.com',
            id: ulid(),
            image: gravatar('admin@example.com'),
            name: 'Jane Doe',
            roles: [invalidRole],
          }),
        )
      // Assert
      expect(user).toThrowError()
    })
  })
})
