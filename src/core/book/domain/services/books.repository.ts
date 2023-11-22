import Book from '@/core/book/domain/model/book.entity'

import BookId from '../model/id.value-object'

export default interface Books {
  // Finds a user by email
  findAll(): Promise<Book[]>
  findById(id: BookId): Promise<Book | null>
  save(book: Book): Promise<void>
}
