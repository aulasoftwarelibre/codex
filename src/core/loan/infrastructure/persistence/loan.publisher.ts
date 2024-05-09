import { PrismaClient } from '@prisma/client'

import { ApplicationError } from '@/core/common/domain/errors/application-error'
import { Publisher } from '@/core/common/domain/publisher/publisher'
import { Loan } from '@/core/loan/domain/model/loan.entity'
import { LoanDataMapper } from '@/core/loan/infrastructure/persistence/loan.data-mapper'

export class LoanPublisher extends Publisher<Loan> {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(loan: Loan): Promise<void> {
    const data = LoanDataMapper.toPrisma(loan)

    try {
      await this.prisma.loan.create({
        data,
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }

  async update(loan: Loan, version: number): Promise<void> {
    const { id, ...data } = LoanDataMapper.toPrisma(loan)

    try {
      await this.prisma.loan.update({
        data,
        where: {
          id,
          version,
        },
      })
    } catch (error) {
      throw new ApplicationError((error as Error).toString())
    }
  }
}
