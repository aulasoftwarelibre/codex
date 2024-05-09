import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { Book } from '@/core/book/domain/model/book.entity'
import { LoanedBook } from '@/core/book/domain/model/loaned-book.entity'
import { BookId } from '@/core/common/domain/value-objects/book-id'

export interface Books {
  findAvailable(id: BookId): Promise<AvailableBook>
  findLoaned(id: BookId): Promise<LoanedBook>
  save(book: Book): Promise<void>
}
