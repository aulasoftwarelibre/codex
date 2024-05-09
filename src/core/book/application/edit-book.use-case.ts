import { Book } from '@/core/book/domain/model/book.entity'
import { Books } from '@/core/book/domain/services/books.repository'
import { EditBookRequest } from '@/core/book/dto/requests/edit-book.request'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { FullNames } from '@/core/common/domain/value-objects/fullnames'
import { Image } from '@/core/common/domain/value-objects/image'
import { Title } from '@/core/common/domain/value-objects/title'

export class EditBookUseCase {
  constructor(private readonly books: Books) {}

  async with(command: EditBookRequest): Promise<void> {
    const bookId = BookId.create(command.id)
    const book = await this.findBook(bookId)

    return this.updateBook(book, command)
  }

  private async findBook(bookId: BookId): Promise<Book> {
    try {
      return this.books.findAvailable(bookId)
    } catch {
      return this.books.findLoaned(bookId)
    }
  }

  private async updateBook(
    book: Book,
    command: EditBookRequest,
  ): Promise<void> {
    const authors = FullNames.create(command.authors)
    const image = Image.create(command.image)
    const title = Title.create(command.title)

    book.authors = authors
    book.image = image
    book.title = title

    return this.books.save(book)
  }
}
