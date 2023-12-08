import { ulid } from 'ulid'

import Book from '@/core/book/domain/model/book.entity'
import LoanDataMapper from '@/core/loan/infrastructure/persistence/loan.data-mapper'
import User from '@/core/user/domain/model/user.entity'

const LoansExamples = {
  ofBookAndUser: (book: Book, user: User) =>
    LoanDataMapper.toModel({
      bookId: book.id.value,
      id: ulid(),
      startsAt: new Date(),
      userId: user.id.value,
      version: 0,
    }),
}

export default LoansExamples
