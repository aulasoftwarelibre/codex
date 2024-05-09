import { PrismaClient } from '@prisma/client'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { BookType } from '@/core/book/infrastructure/persistence/book.type'
import { ApplicationError } from '@/core/common/domain/errors/application-error'

export class FindBookQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(bookId: string): Promise<BookResponse> {
    try {
      const book = await this.prisma.book.findUniqueOrThrow({
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
      })

      return this.mapToBookResponse(book)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  private mapToBookResponse(book: BookType) {
    return BookResponse.fromType(book)
  }
}
