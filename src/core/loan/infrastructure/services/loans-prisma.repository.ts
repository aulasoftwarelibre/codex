import { Loan as LoanPrisma, PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import NotFoundError from '@/core/common/domain/errors/application/not-found-error'
import ApplicationError from '@/core/common/domain/errors/application-error'
import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import ignore from '@/core/common/utils/ignore'
import Loan from '@/core/loan/domain/model/loan.entity'
import Loans from '@/core/loan/domain/services/loans.repository'
import LoanDataMapper from '@/core/loan/infrastructure/persistence/loan.data-mapper'

export default class LoansPrisma implements Loans {
  constructor(private readonly prisma: PrismaClient) {}

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
    const data = LoanDataMapper.toPrisma(loan)

    return ResultAsync.fromPromise(
      this.prisma.loan.upsert({
        create: data,
        update: data,
        where: { id: data.id },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(ignore)
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
    ).andThen(ignore)
  }
}
