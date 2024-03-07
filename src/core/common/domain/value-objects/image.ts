import { Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'

export default class Image {
  constructor(public readonly value: string) {}

  static create(name: string): Result<Image, DomainError> {}
}
