import { describe, expect, it } from 'vitest'

import DomainError from '@/core/common/domain/errors/domain-error'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import unexpected from '@/lib/utils/unexpected'

describe('FullNames', () => {
  describe('create', () => {
    it('should create a valid FullNames instance', () => {
      // Arrange
      const validFullNamesStrings = ['John Doe', 'Jane Doe']

      // Act
      const result = FullNames.create(validFullNamesStrings)

      // Assert
      result.match(
        (fullNames) => {
          expect(fullNames).toBeInstanceOf(FullNames)
          expect(fullNames.map((fullname) => fullname.value)).toEqual(
            validFullNamesStrings,
          )
        },
        (error) => unexpected.error(error),
      )
    })

    it('should return an error for invalid full names', () => {
      // Arrange
      const invalidFullNamesStrings = ['John Doe', '', 'Jane Doe']

      // Act
      const result = FullNames.create(invalidFullNamesStrings)

      // Assert
      result.match(
        (fullNames) => unexpected.success(fullNames),
        (error) => expect(error).toBeInstanceOf(DomainError),
      )
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
