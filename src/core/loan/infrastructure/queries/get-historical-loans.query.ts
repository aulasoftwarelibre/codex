import { PrismaClient } from '@prisma/client'
import { okAsync, ResultAsync } from 'neverthrow'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { HistoricalLoansResponse } from '@/core/loan/dto/responses/historical-loans.response'
import { LoanRegistryType } from '@/core/loan/infrastructure/persistence/loan-registry.type'

export class GetHistoricalLoansQuery {
  constructor(private readonly prisma: PrismaClient) {}

  with(
    bookId: string,
  ): ResultAsync<HistoricalLoansResponse[], ApplicationError> {
    return ResultAsync.fromPromise(
      this.prisma.loanRegistry.findMany({
        include: {
          user: true,
        },
        where: {
          bookId,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen((loans) => this.mapToLoanRegistryResponse(loans))
  }

  private mapToLoanRegistryResponse(loans: LoanRegistryType[]) {
    return okAsync(loans.map((loan) => HistoricalLoansResponse.fromType(loan)))
  }
}
