import { describe, expect, it } from 'vitest'

import { ValueObject } from '@/core/common/domain/model/value-object'

describe('Value Object', () => {
  class ClassA extends ValueObject<string> {
    constructor(value: string) {
      super(value)
    }
  }

  class ClassB extends ValueObject<string> {
    constructor(value: string) {
      super(value)
    }
  }

  describe('equals', () => {
    it('should compare two same classes and same value as true', () => {
      // Arrange
      const left = new ClassA('Class A')
      const right = new ClassA('Class A')
      // Act
      const result = left.equals(right)
      // Assert
      expect(result).toBeTruthy()
    })

    it('should compare two same classes and different value as false', () => {
      // Arrange
      const left = new ClassA('Class A')
      const right = new ClassA('Another class A')
      // Act
      const result = left.equals(right)
      // Assert
      expect(result).toBeFalsy()
    })

    it('should compare two different classes and same value as false', () => {
      // Arrange
      const left = new ClassA('Class A')
      const right = new ClassB('Class A')
      // Act
      const result = left.equals(right)
      // Assert
      expect(result).toBeFalsy()
    })
  })

  describe('toRepresentation', () => {
    it('should return a string representation', () => {
      // Arrange
      const left = new ClassA('value')
      // Act
      const result = left.toRepresentation()
      // Assert
      expect(result).toEqual('ClassA(value)')
    })
  })
})
