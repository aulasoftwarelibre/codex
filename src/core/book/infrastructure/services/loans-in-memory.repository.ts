import { okAsync, ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import Email from '@/core/common/domain/value-objects/email'

import Loans from '../../domain/services/loans.service'

export default class LoansInMemory implements Loans {
  public loans: Map<BookId, Email> = new Map()

  create(
    bookId: BookId,
    userEmail: Email,
  ): ResultAsync<BookId, ApplicationError> {
    this.loans.set(bookId, userEmail)
    return okAsync(bookId)
  }
}
