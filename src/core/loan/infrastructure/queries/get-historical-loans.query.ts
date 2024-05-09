import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { HistoricalLoansResponse } from '@/core/loan/dto/responses/historical-loans.response'
import { LoanRegistryType } from '@/core/loan/infrastructure/persistence/loan-registry.type'

export class GetHistoricalLoansQuery {
  constructor(private readonly prisma: PrismaClient) {}

  async with(bookId: string): Promise<HistoricalLoansResponse[]> {
    try {
      const loans = await this.prisma.loanRegistry.findMany({
        include: {
          user: true,
        },
        where: {
          bookId,
        },
      })

      return this.mapToLoanRegistryResponse(loans)
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  private mapToLoanRegistryResponse(loans: LoanRegistryType[]) {
    return loans.map((loan) => HistoricalLoansResponse.fromType(loan))
  }
}
