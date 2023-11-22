import Book from '../domain/model/book.entity'
import BookId from '../domain/model/id.value-object'
import Books from '../domain/services/books.repository'
import { CreateBookCommand } from './types'

export default class CreateBookUseCase {
  constructor(private readonly bookRepository: Books) {}

  async with(command: CreateBookCommand): Promise<void> {
    if (
      !(this.bookRepository.findById(BookId.create(command.id)) instanceof Book)
    ) {
      throw Error('This book already exists')
    }
    const book: Book = Book.create(
      command.id,
      command.authors,
      command.title,
      command.image,
    )
    this.bookRepository.save(book)
  }
}
