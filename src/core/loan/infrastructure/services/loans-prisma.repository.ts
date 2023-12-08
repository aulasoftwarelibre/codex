import { Loan as LoanPrisma, PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import stop from '@/core/common/utils/stop'
import Loan from '@/core/loan/domain/model/loan.entity'
import Loans from '@/core/loan/domain/services/loans.repository'
import LoanDataMapper from '@/core/loan/infrastructure/persistence/loan.data-mapper'
import LoanPublisher from '@/core/loan/infrastructure/persistence/loan.publisher'

export default class LoansPrisma implements Loans {
  private publisher: LoanPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new LoanPublisher(prisma)
  }

  ofBook(bookId: BookId): ResultAsync<Loan, NotFoundError> {
    return ResultAsync.fromPromise(
      this.prisma.loan.findUniqueOrThrow({
        where: {
          bookId: bookId.value,
        },
      }),
      () => NotFoundError.withId(bookId),
    ).andThen((loan) => okAsync(LoanDataMapper.toModel(loan)))
  }

  save(loan: Loan): ResultAsync<void, ApplicationError> {
    return this.publisher.mergeObjectContext(loan).commit()
  }

  remove(id: LoanId): ResultAsync<void, NotFoundError> {
    return ResultAsync.fromPromise(
      this.prisma.loan.delete({
        where: {
          id: id.value,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen((loan) => this.registerLoan(loan))
  }

  private registerLoan(loan: LoanPrisma) {
    return ResultAsync.fromPromise(
      this.prisma.loanRegistry.create({
        data: {
          ...loan,
          finishedAt: new Date(),
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(stop)
  }
}
