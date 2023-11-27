import { okAsync, ResultAsync } from 'neverthrow'

import Books from '@/core/book/domain/services/books.repository'
import BookResponse from '@/core/book/dto/responses/book.response'
import ApplicationError from '@/core/common/domain/errors/application-error'

export default class FindBooksUseCase {
  constructor(private readonly books: Books) {}

  with(): ResultAsync<BookResponse[], ApplicationError> {
    return this.books.findAll().andThen((books) => {
      return okAsync(books.map((book) => BookResponse.fromModel(book)))
    })
  }
}
