import { describe, expect, test as it } from 'vitest'

import Title from '@/core/common/domain/value-objects/title/index'
import TitleError from '@/core/common/domain/value-objects/title/title.error'
import unexpected from '@/lib/utils/unexpected'

describe('Title', () => {
  describe('create', () => {
    it('should create a Title instance with a valid title', () => {
      // Arrange
      const validTitle = 'A book title'

      // Act
      const result = Title.create(validTitle)

      // Assert
      result.match(
        (fullName) => {
          expect(fullName).toBeInstanceOf(Title)
          expect(fullName.value).toBe(validTitle)
        },
        (error) => {
          unexpected.error(error)
        },
      )
    })

    it('should return a TitleError for an invalid title', () => {
      // Arrange
      const invalidTitle = 'Jo' // Name length is less than 3

      // Act
      const result = Title.create(invalidTitle)

      // Assert
      result.match(
        (fullName) => {
          unexpected.success(fullName)
        },
        (error) => {
          expect(error).toBeInstanceOf(TitleError)
        },
      )
    })

    it('should return a TitleError for an empty name', () => {
      // Arrange
      const emptyName = ''

      // Act
      const result = Title.create(emptyName)

      // Assert
      result.match(
        (fullName) => {
          unexpected.success(fullName)
        },
        (error) => {
          expect(error).toBeInstanceOf(TitleError)
        },
      )
    })
  })
})
