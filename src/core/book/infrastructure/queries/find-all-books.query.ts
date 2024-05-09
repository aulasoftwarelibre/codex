import { PrismaClient } from '@prisma/client'

import { SearchBookRequest } from '@/core/book/dto/requests/search-book.requests'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { BookType } from '@/core/book/infrastructure/persistence/book.type'

export class FindAllBooksQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(request?: SearchBookRequest): Promise<BookResponse[]> {
    const books = await this.prisma.book.findMany({
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
      ...(request
        ? {
            where: {
              title: {
                search: request?.terms.join(' & '),
              },
            },
          }
        : {}),
    })

    return this.mapToBookResponse(books)
  }

  private mapToBookResponse(books: BookType[]) {
    return books.map((book) => BookResponse.fromType(book))
  }
}
