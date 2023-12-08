import { PrismaClient } from '@prisma/client'
import { ResultAsync } from 'neverthrow'

import ApplicationError from '@/core/common/domain/errors/application-error'
import Publisher from '@/core/common/domain/publisher/publisher'
import stop from '@/core/common/utils/stop'
import Loan from '@/core/loan/domain/model/loan.entity'
import LoanDataMapper from '@/core/loan/infrastructure/persistence/loan.data-mapper'

export default class LoanPublisher extends Publisher<Loan> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  create(loan: Loan): ResultAsync<void, ApplicationError> {
    const data = LoanDataMapper.toPrisma(loan)

    return ResultAsync.fromPromise(
      this.prisma.loan.create({
        data,
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(stop)
  }

  update(loan: Loan, version: number): ResultAsync<void, ApplicationError> {
    const { id, ...data } = LoanDataMapper.toPrisma(loan)

    return ResultAsync.fromPromise(
      this.prisma.loan.update({
        data,
        where: {
          id,
          version,
        },
      }),
      (error: unknown) => new ApplicationError((error as Error).toString()),
    ).andThen(stop)
  }
}
