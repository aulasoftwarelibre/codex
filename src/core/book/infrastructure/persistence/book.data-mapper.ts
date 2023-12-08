import AvailableBook from '@/core/book/domain/model/available-book.entity'
import Book from '@/core/book/domain/model/book.entity'
import LoanedBook from '@/core/book/domain/model/loaned-book.entity'
import BookType from '@/core/book/infrastructure/persistence/book.type'
import BookId from '@/core/common/domain/value-objects/book-id'
import FullName from '@/core/common/domain/value-objects/fullname'
import FullNames from '@/core/common/domain/value-objects/fullnames'
import Image from '@/core/common/domain/value-objects/image'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import Title from '@/core/common/domain/value-objects/title'
import UserId from '@/core/common/domain/value-objects/user-id'
import Loan from '@/core/loan/domain/model/loan.entity'

const BookDataMapper = {
  toAvailableBook: (book: BookType): AvailableBook =>
    AvailableBook.withVersion(
      book.version,
      new BookId(book.id),
      new Title(book.title),
      new FullNames(book.authors.map((author) => new FullName(author))),
      new Image(book.image),
    ),
  toLoanedBook: (book: BookType): LoanedBook =>
    LoanedBook.withVersion(
      book.version,
      new BookId(book.id),
      new Title(book.title),
      new FullNames(book.authors.map((author) => new FullName(author))),
      new Image(book.image),
      new Loan(
        new LoanId(book.loan!.id),
        new BookId(book.id),
        new UserId(book.loan!.user.id as string),
        book.loan!.startsAt as Date,
      ),
    ),
  toPrisma: (book: Book): Omit<BookType, 'loan'> => ({
    authors: book.authors.map((author) => author.value),
    id: book.id.value,
    image: book.image.value,
    state: book.state,
    title: book.title.value,
    version: book.version,
  }),
} as const

export default BookDataMapper
