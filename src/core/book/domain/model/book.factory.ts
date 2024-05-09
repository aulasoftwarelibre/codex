import { AvailableBook } from '@/core/book/domain/model/available-book.entity'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { FullNames } from '@/core/common/domain/value-objects/fullnames'
import { Image } from '@/core/common/domain/value-objects/image'
import { Title } from '@/core/common/domain/value-objects/title'

export const BookFactory = {
  create: (bookResponse: BookResponse): AvailableBook => {
    const bookId = BookId.create(bookResponse.id)
    const title = Title.create(bookResponse.title)
    const authors = FullNames.create(bookResponse.authors)
    const image = Image.create(bookResponse.image)

    return new AvailableBook(bookId, title, authors, image)
  },
}
