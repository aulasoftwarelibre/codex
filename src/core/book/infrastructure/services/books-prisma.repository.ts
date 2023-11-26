import { Book as PrismaBook, PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { BookDTO } from '@/core/book/application/types'
import BookNotFoundError from '@/core/book/domain/errors/book-not-found.error'
import Book from '@/core/book/domain/model/book.entity'
import Books from '@/core/book/domain/services/books.repository'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import Title from '@/core/common/domain/value-objects/title'

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
    const { authors, id, image, title } = BookDTO.fromModel(book) as PrismaBook

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
    return new Book(
      new BookId(book.id),
      new Title(book.title),
      new FullNames(book.authors.map((author) => new FullName(author))),
      new Image(book.image),
    )
  }
}
