import { err, ok, Result } from 'neverthrow'

import DomainError from '@/core/common/domain/errors/domain-error'
import FullName from '@/core/common/domain/value-objects/fullname'

export default class FullNames {
  private readonly _fullNames: FullName[]

  constructor(fullNames: FullName[]) {
    this._fullNames = fullNames
  }

  static create(
    fullNames: string[] | readonly string[],
  ): Result<FullNames, DomainError> {
    return Result.combine(
      fullNames.map((fullName) => FullName.create(fullName)),
    ).match<Result<FullNames, DomainError>>(
      (_fullNames) => ok(new FullNames(_fullNames)),
      (_error) => err(_error),
    )
  }

  map<T>(
    callback: (value: FullName, index: number, array: FullName[]) => T,
  ): T[] {
    return this._fullNames.map((element, index, array) =>
      callback(element, index, array),
    )
  }
}
