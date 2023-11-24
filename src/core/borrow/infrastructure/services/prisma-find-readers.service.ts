import { PrismaClient } from '@prisma/client'

import {
  BorrowWithReaderResponse,
  FindBorrowsService,
} from '../../application/services/find-readers.service'

export class PrismaFindReader implements FindBorrowsService {
  constructor(private readonly prisma: PrismaClient) {}
  async withReader(bookId: string): Promise<BorrowWithReaderResponse | null> {
    const borrow = await this.prisma.borrow.findUnique({
      select: {
        id: true,
        user: true,
      },
      where: {
        bookId,
      },
    })

    if (!borrow) {
      return null
    }

    const {
      id,
      user: { email },
    } = borrow

    return {
      id,
      reader: {
        email: String(email),
      },
    }
  }
}
