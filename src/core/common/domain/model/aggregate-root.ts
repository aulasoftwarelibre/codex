import { ApplicationError } from '@/core/common/domain/errors/application-error'

const VERSION = Symbol()

export abstract class AggregateRoot {
  protected [VERSION] = -1

  protected constructor(version: number = -1) {
    this[VERSION] = version
  }

  public static withVersion<
    T extends AggregateRoot,
    K extends new (...arguments__: never[]) => T,
  >(this: K, version: number, ...arguments_: ConstructorParameters<K>): T {
    const entity = new this(...arguments_)
    entity[VERSION] = version

    return entity
  }

  get version(): Readonly<number> {
    return this[VERSION]
  }

  async commit(): Promise<void> {
    this[VERSION] += 1

    return this.publish(this)
  }

  async publish(instance: AggregateRoot): Promise<void> {
    throw new ApplicationError(
      `Not implemented publish method for ${instance.constructor.name} aggregate`,
    )
  }
}
