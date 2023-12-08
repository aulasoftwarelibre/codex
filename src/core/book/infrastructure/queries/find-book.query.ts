import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import BookResponse from '@/core/book/dto/responses/book.response'
import BookType from '@/core/book/infrastructure/persistence/book.type'
import ApplicationError from '@/core/common/domain/errors/application-error'

export default class FindBookQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(bookId: string): ResultAsync<BookResponse, ApplicationError> {
    return ResultAsync.fromPromise(
      this.prisma.book.findUniqueOrThrow({
        include: {
          loan: {
            include: {
              user: true,
            },
          },
        },
        where: {
          id: bookId,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen((book) => this.mapToBookResponse(book))
  }

  private mapToBookResponse(book: BookType) {
    return okAsync(BookResponse.fromBookType(book))
  }
}
