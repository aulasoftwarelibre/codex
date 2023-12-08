import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import BookResponse from '@/core/book/dto/responses/book.response'
import BookType from '@/core/book/infrastructure/persistence/book.type'
import ApplicationError from '@/core/common/domain/errors/application-error'

export default class FindAllBooksQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(): ResultAsync<BookResponse[], ApplicationError> {
    return ResultAsync.fromSafePromise(
      this.prisma.book.findMany({
        include: {
          loan: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      }),
    ).andThen((books) => this.mapToBookResponse(books))
  }

  private mapToBookResponse(books: BookType[]) {
    return okAsync(books.map((book) => BookResponse.fromBookType(book)))
  }
}
