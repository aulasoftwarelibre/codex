import { okAsync, ResultAsync } from 'neverthrow'

import { BookDTO } from '@/core/book/application/types'
import Books from '@/core/book/domain/services/books.repository'
import ApplicationError from '@/core/common/domain/errors/application-error'

export default class FindBooksUseCase {
  constructor(private readonly books: Books) {}

  with(): ResultAsync<BookDTO[], ApplicationError> {
    return this.books.findAll().andThen((books) => {
      return okAsync(books.map((book) => BookDTO.fromModel(book)))
    })
  }
}
