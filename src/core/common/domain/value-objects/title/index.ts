import { err, ok, Result } from 'neverthrow'

import TitleError from '@/core/common/domain/value-objects/title/title.error'

export default class Title {
  constructor(public readonly value: string) {}

  public static create(author: string): Result<Title, TitleError> {
    if (!author || author.length < 3) {
      return err(TitleError.causeTooShort())
    }

    return ok(new Title(author))
  }
}
