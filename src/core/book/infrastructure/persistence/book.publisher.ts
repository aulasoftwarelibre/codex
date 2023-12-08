import { PrismaClient } from '@prisma/client'
import { ResultAsync } from 'neverthrow'

import Book from '@/core/book/domain/model/book.entity'
import BookDataMapper from '@/core/book/infrastructure/persistence/book.data-mapper'
import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'

export default class BookPublisher extends Publisher<Book> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  create(book: Book): ResultAsync<void, ApplicationError> {
    const data = BookDataMapper.toPrisma(book)

    return ResultAsync.fromPromise(
      this.prisma.book.create({
        data,
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(this.checkVersion(0))
  }

  update(book: Book, version: number): ResultAsync<void, ApplicationError> {
    const { id, ...data } = BookDataMapper.toPrisma(book)

    return ResultAsync.fromPromise(
      this.prisma.book.update({
        data,
        where: {
          id,
          version,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(this.checkVersion(version))
  }
}
