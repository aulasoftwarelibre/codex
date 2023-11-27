import { Book as PrismaBook, PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import BookNotFoundError from '@/core/book/domain/errors/book-not-found.error'
import Book from '@/core/book/domain/model/book.entity'
import BookFactory from '@/core/book/domain/model/book.factory'
import Books from '@/core/book/domain/services/books.repository'
import BookResponse from '@/core/book/dto/responses/book.response'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'

export default class BooksPrisma implements Books {
  constructor(private readonly prisma: PrismaClient) {}

  findAll(): ResultAsync<Book[], ApplicationError> {
    return ResultAsync.fromSafePromise(this.prisma.book.findMany()).andThen(
      (books) => okAsync(books.map((book) => this.mapFromPrismaBook(book))),
    )
  }

  findById(id: BookId): ResultAsync<Book, BookNotFoundError> {
    return ResultAsync.fromPromise(
      this.prisma.book.findUniqueOrThrow({
        where: {
          id: id.value,
        },
      }),
      () => BookNotFoundError.withId(id),
    ).andThen((book) => okAsync(this.mapFromPrismaBook(book)))
  }

  save(book: Book): ResultAsync<Book, ApplicationError> {
    const { authors, id, image, title } = BookResponse.fromModel(
      book,
    ) as PrismaBook

    return ResultAsync.fromPromise(
      this.prisma.book.upsert({
        create: {
          authors,
          id,
          image,
          title,
        },
        update: {
          authors,
          image,
          title,
        },
        where: {
          id,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(() => okAsync(book))
  }

  private mapFromPrismaBook(book: PrismaBook): Book {
    return BookFactory.with(book satisfies BookResponse)
  }
}
