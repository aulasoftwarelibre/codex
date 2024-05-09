import { Loan as LoanPrisma, PrismaClient } from '@prisma/client'

import { NotFoundError } from '@/core/common/domain/errors/application/not-found-error'
import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { LoanId } from '@/core/common/domain/value-objects/loan-id'
import { Loan } from '@/core/loan/domain/model/loan.entity'
import { Loans } from '@/core/loan/domain/services/loans.repository'
import { LoanDataMapper } from '@/core/loan/infrastructure/persistence/loan.data-mapper'
import { LoanPublisher } from '@/core/loan/infrastructure/persistence/loan.publisher'

export class LoansPrisma implements Loans {
  private publisher: LoanPublisher

  constructor(private readonly prisma: PrismaClient) {
    this.publisher = new LoanPublisher(prisma)
  }

  async ofBook(bookId: BookId): Promise<Loan> {
    try {
      const loan = await this.prisma.loan.findUniqueOrThrow({
        where: {
          bookId: bookId.value,
        },
      })

      return LoanDataMapper.toModel(loan)
    } catch {
      throw NotFoundError.withId(bookId)
    }
  }

  async save(loan: Loan): Promise<void> {
    return this.publisher.mergeObjectContext(loan).commit()
  }

  async remove(id: LoanId): Promise<void> {
    try {
      const loan = await this.prisma.loan.delete({
        where: {
          id: id.value,
        },
      })

      return this.registerLoan(loan)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  private async registerLoan(loan: LoanPrisma) {
    try {
      await this.prisma.loanRegistry.create({
        data: {
          ...loan,
          finishedAt: new Date(),
        },
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }
}
