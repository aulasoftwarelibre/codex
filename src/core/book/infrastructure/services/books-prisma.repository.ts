import { BookState, PrismaClient } from '@prisma/client'

import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { Book } from '@/core/book/domain/model/book.entity'
import { LoanedBook } from '@/core/book/domain/model/loaned-book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { BookDataMapper } from '@/core/book/infrastructure/persistence/book.data-mapper'
import { BookPublisher } from '@/core/book/infrastructure/persistence/book.publisher'
import { BookType } from '@/core/book/infrastructure/persistence/book.type'
import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'

export class BooksPrisma implements Books {
  private publisher: BookPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new BookPublisher(prisma)
  }

  async findAvailable(id: BookId): Promise<AvailableBook> {
    const book = await this.ofId(id, BookState.AVAILABLE)

    return BookDataMapper.toAvailableBook(book)
  }

  async findLoaned(id: BookId): Promise<LoanedBook> {
    const book = await this.ofId(id, BookState.LOANED)

    return BookDataMapper.toLoanedBook(book)
  }

  private async ofId(id: BookId, state: BookState): Promise<BookType> {
    try {
      return this.prisma.book.findUniqueOrThrow({
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
      })
    } catch {
      throw NotFoundError.withId(id)
    }
  }

  async save(book: Book): Promise<void> {
    return this.publisher.mergeObjectContext(book).commit()
  }
}
