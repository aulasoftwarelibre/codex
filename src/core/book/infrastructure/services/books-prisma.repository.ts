import { BookState, PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { Book } from '@/core/book/domain/model/book.entity'
import { LoanedBook } from '@/core/book/domain/model/loaned-book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { BookDataMapper } from '@/core/book/infrastructure/persistence/book.data-mapper'
import { BookPublisher } from '@/core/book/infrastructure/persistence/book.publisher'
import { BookType } from '@/core/book/infrastructure/persistence/book.type'
import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'

export class BooksPrisma implements Books {
  private publisher: BookPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new BookPublisher(prisma)
  }

  findAvailable(id: BookId): ResultAsync<AvailableBook, NotFoundError> {
    return this.ofId(id, BookState.AVAILABLE).andThen((book) =>
      okAsync(BookDataMapper.toAvailableBook(book)),
    )
  }

  findLoaned(id: BookId): ResultAsync<LoanedBook, NotFoundError> {
    return this.ofId(id, BookState.LOANED).andThen((book) =>
      okAsync(BookDataMapper.toLoanedBook(book)),
    )
  }

  private ofId(
    id: BookId,
    state: BookState,
  ): ResultAsync<BookType, NotFoundError> {
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
          id: id.value,
          state,
        },
      }),
      () => NotFoundError.withId(id),
    )
  }

  save(book: Book): ResultAsync<void, ApplicationError> {
    return this.publisher.mergeObjectContext(book).commit()
  }
}
