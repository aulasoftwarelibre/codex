import { ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import Email from '@/core/common/domain/value-objects/email'

export default interface Loans {
  create(
    bookId: BookId,
    userEmail: Email,
  ): ResultAsync<BookId, ApplicationError>
}
