import { err, ok, Result } from 'neverthrow'

import FullName from '@/core/common/domain/value-objects/fullname'
import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'

export default class FullNames {
  private readonly _fullNames: FullName[]

  constructor(fullNames: FullName[]) {
    this._fullNames = fullNames
  }

  static create(
    fullNames: string[] | readonly string[],
  ): Result<FullNames, FullNameError> {
    return Result.combine(
      fullNames.map((fullName) => FullName.create(fullName)),
    ).match<Result<FullNames, FullNameError>>(
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
