import { PrismaClient } from '@prisma/client'

import { Book } from '@/core/book/domain/model/book.entity'
import { BookDataMapper } from '@/core/book/infrastructure/persistence/book.data-mapper'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Publisher } from '@/core/common/domain/publisher/publisher'

export class BookPublisher extends Publisher<Book> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(book: Book): Promise<void> {
    const data = BookDataMapper.toPrisma(book)

    try {
      const _book = await this.prisma.book.create({
        data,
      })
      this.checkVersion(0)(_book)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  async update(book: Book, version: number): Promise<void> {
    const { id, ...data } = BookDataMapper.toPrisma(book)

    try {
      const _book = await this.prisma.book.update({
        data,
        where: {
          id,
          version,
        },
      })
      this.checkVersion(version)(_book)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }
}
