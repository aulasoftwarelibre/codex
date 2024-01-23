import { okAsync, ResultAsync } from 'neverthrow'

import Book, { BookState } from '@/core/book/domain/model/book.entity'
import ApplicationError from '@/core/common/domain/errors/application-error'
import UserId from '@/core/common/domain/value-objects/user-id'
import LoanBookService from '@/core/loan/domain/services/loan-book.service'

export default class AvailableBook extends Book {
  loanTo(
    userId: UserId,
    loanBookService: LoanBookService,
  ): ResultAsync<Book, ApplicationError> {
    this._state = BookState.LOANED

    return loanBookService.with(this, userId).andThen(() => {
      return okAsync(this)
    })
  }
}
