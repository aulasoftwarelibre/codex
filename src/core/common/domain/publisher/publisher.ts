import { errAsync, okAsync, ResultAsync } from 'neverthrow'

import { InvalidVersionError } from '@/core/common/domain/errors/application/invalid-version-error'
import { AggregateRoot } from '@/core/common/domain/model/aggregate-root'

export abstract class Publisher<T extends AggregateRoot> {
  protected abstract create(instance: T): ResultAsync<void, InvalidVersionError>

  protected abstract update(
    instance: T,
    version: number,
  ): ResultAsync<void, InvalidVersionError>

  mergeObjectContext(object: T): T {
    object.publish = (instance: T) => {
      if (instance.version === 0) {
        return this.create(instance)
      }

      return this.update(instance, instance.version - 1)
    }

    return object
  }

  protected checkVersion(version: number) {
    return (result: unknown | undefined) =>
      result
        ? okAsync(undefined)
        : errAsync(InvalidVersionError.withVersion(version))
  }
}
