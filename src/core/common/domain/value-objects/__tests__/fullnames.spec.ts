import { describe, expect, it } from 'vitest'

import { FullName } from '@/core/common/domain/value-objects/fullname'
import { FullNames } from '@/core/common/domain/value-objects/fullnames'

describe('FullNames', () => {
  describe('create', () => {
    it('should create a valid FullNames instance', () => {
      // Arrange
      const validFullNamesStrings = ['John Doe', 'Jane Doe']

      // Act
      const fullNames = FullNames.create(validFullNamesStrings)

      // Assert
      expect(fullNames).toBeInstanceOf(FullNames)
      expect(fullNames.map((fullname) => fullname.value)).toEqual(
        validFullNamesStrings,
      )
    })

    it('should return an error for invalid full names', () => {
      // Arrange
      const invalidFullNamesStrings = ['John Doe', '', 'Jane Doe']

      // Act
      const result = () => FullNames.create(invalidFullNamesStrings)

      // Assert
      expect(result).toThrowError()
    })
  })

  describe('map', () => {
    it('should apply a function to each element of FullNames', () => {
      // Arrange
      const fullNamesStrings = ['John Doe', 'Jane Doe']
      const fullNames = fullNamesStrings.map(
        (fullName) => new FullName(fullName),
      )
      const fullNamesInstance = new FullNames(fullNames)

      // Act
      const result = fullNamesInstance.map((function_) =>
        function_.value.toUpperCase(),
      )

      // Assert
      expect(result).toEqual(['JOHN DOE', 'JANE DOE'])
    })
  })
})
