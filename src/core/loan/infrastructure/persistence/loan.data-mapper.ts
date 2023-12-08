import { Loan as PrismaLoan } from '@prisma/client'

import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import UserId from '@/core/common/domain/value-objects/user-id'
import Loan from '@/core/loan/domain/model/loan.entity'

const LoanDataMapper = {
  toModel: (loan: PrismaLoan): Loan =>
    Loan.withVersion(
      loan.version,
      new LoanId(loan.id),
      new BookId(loan.bookId),
      new UserId(loan.userId),
      new Date(loan.startsAt),
    ),
  toPrisma: (loan: Loan): PrismaLoan => ({
    bookId: loan.bookId.value,
    id: loan.id.value,
    startsAt: loan.startsAt,
    userId: loan.userId.value,
    version: loan.version,
  }),
} as const

export default LoanDataMapper
