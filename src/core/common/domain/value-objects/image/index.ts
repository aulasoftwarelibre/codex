import { err, ok, Result } from 'neverthrow'

import ImageError from '@/core/common/domain/value-objects/image/image.error'

export default class Image {
  constructor(public readonly value: string) {}

  static create(name: string): Result<Image, ImageError> {
    try {
      new URL(name)
    } catch {
      return err(ImageError.causeInvalidUrl())
    }

    return ok(new Image(name))
  }
}
