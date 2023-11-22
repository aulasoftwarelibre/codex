import Book from '@/core/book/domain/model/book.entity'

export default interface Books {
  // Finds a user by email
  findAll(): Promise<Book[]>

  // Saves a user
  save(user: Book): Promise<void>
}
