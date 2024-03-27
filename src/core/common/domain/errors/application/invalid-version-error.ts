import { ApplicationError } from '@/core/common/domain/errors/application-error'

export class InvalidVersionError extends ApplicationError {
  static withVersion(version: number) {
    return new InvalidVersionError(
      `Error trying to persist old version ${version}`,
    )
  }
}
