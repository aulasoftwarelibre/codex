import { FullName } from '@/core/common/domain/value-objects/fullname'

export class FullNames {
  private readonly _fullNames: FullName[]

  constructor(fullNames: FullName[]) {
    this._fullNames = fullNames
  }

  static create(fullNames: string[] | readonly string[]): FullNames {
    const _fullNames = fullNames.map((fullName) => FullName.create(fullName))

    return new FullNames(_fullNames)
  }

  map<T>(
    callback: (value: FullName, index: number, array: FullName[]) => T,
  ): T[] {
    return this._fullNames.map((element, index, array) =>
      callback(element, index, array),
    )
  }
}
