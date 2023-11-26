import { err, ok, Result } from 'neverthrow'

import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'

export default class FullName {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<FullName, FullNameError> {
    if (!author || author.length < 3) {
      return err(FullNameError.causeNameTooShort())
    }

    return ok(new FullName(author))
  }
}
