import { ulid } from 'ulid'
import { describe, expect, it } from 'vitest'

import Id from '@/core/common/domain/value-objects/id'
import unexpected from '@/lib/utils/unexpected'

describe('Id', () => {
  describe('create', () => {
    it('should create an instance of Id with valid value', () => {
      // Arrange
      const validValue = ulid()

      // Act
      const result = Id.create(validValue)

      // Assert
      result.match(
        (value) => {
          expect(value).toBeDefined()
        },
        (error) => unexpected.error(error),
      )
    })

    it('should return an error for invalid value', () => {
      // Arrange
      const invalidValue = 'invalid-value'

      // Act
      const result = Id.create(invalidValue)

      // Assert
      result.match(
        (success) => unexpected.success(success),
        (error) => {
          expect(error).toBeDefined()
        },
      )
    })

    it('should return an error for empty value', () => {
      // Arrange
      const emptyValue = ''

      // Act
      const result = Id.create(emptyValue)

      // Assert
      result.match(
        (success) => unexpected.success(success),
        (error) => {
          expect(error).toBeDefined()
        },
      )
    })
  })

  describe('generate', () => {
    it('should generate a new Id instance', () => {
      // Act
      const generatedId = Id.generate()

      // Assert
      expect(generatedId).toEqual(expect.any(Id))
    })
  })
})
