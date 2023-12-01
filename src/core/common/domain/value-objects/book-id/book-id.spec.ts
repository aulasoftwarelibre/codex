import { describe, expect, test as it } from 'vitest'

import BookId from '@/core/common/domain/value-objects/book-id'
import Id from '@/core/common/domain/value-objects/id'

describe('BookId', () => {
  describe('create', () => {
    it('should creates an id', () => {
      // Arrange
      // Act
      const id = new BookId('id')
      // Assert
      expect(id.value).toEqual('id')
    })

    it('should generates an id', () => {
      // Arrange
      // Act
      const id = BookId.generate()
      // Assert
      expect(id.value).toBeDefined()
    })

    it('should be equal to itself', () => {
      // Arrange
      const id = BookId.generate()
      // Act
      const equal = id.equals(id)
      // Assert
      expect(equal).toBeTruthy()
    })

    it('should be different to other id', () => {
      // Arrange
      const id = BookId.generate()
      const other = BookId.generate()
      // Act
      const equal = id.equals(other)
      // Assert
      expect(equal).toBeFalsy()
    })

    it('should be different to other kind of id with the same value', () => {
      // Arrange
      const id = BookId.generate()
      const other = new Id(id.value)
      // Act
      const equal = id.equals(other)
      // Assert
      expect(equal).toBeFalsy()
    })
  })
})
