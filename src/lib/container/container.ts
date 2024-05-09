import { CreateBookUseCase } from '@/core/book/application/create-book.use-case'
import { EditBookUseCase } from '@/core/book/application/edit-book.use-case'
import { LoanBookUseCase } from '@/core/book/application/loan-book-use.case'
import { ReturnBookUseCase } from '@/core/book/application/return-book.use-case'
import { FindAllBooksQuery } from '@/core/book/infrastructure/queries/find-all-books.query'
import { FindBookQuery } from '@/core/book/infrastructure/queries/find-book.query'
import { BooksPrisma } from '@/core/book/infrastructure/services/books-prisma.repository'
import { LoanBookService } from '@/core/loan/domain/services/loan-book.service'
import { ReturnBookService } from '@/core/loan/domain/services/return-book.service'
import { GetHistoricalLoansQuery } from '@/core/loan/infrastructure/queries/get-historical-loans.query'
import { LoansPrisma } from '@/core/loan/infrastructure/services/loans-prisma.repository'
import { CreateReviewUseCase } from '@/core/review/application/create-review.use-case'
import { GetReviewStatsQuery } from '@/core/review/infrastructure/queries/get-review-stats.query'
import { GetReviewsQuery } from '@/core/review/infrastructure/queries/get-reviews.query'
import { ReviewsPrisma } from '@/core/review/infrastructure/services/reviews-prisma.repository'
import { EnableUserUseCase } from '@/core/user/application/enable-user.use-case'
import { FindUserUseCase } from '@/core/user/application/find-user.use-case'
import { UpdateSettingUseCase } from '@/core/user/application/update-setting.use-case'
import { UpdateUserUseCase } from '@/core/user/application/update-user.use-case'
import { FindAllUsersQuery } from '@/core/user/infrastructure/queries/find-all-users.query'
import { UsersPrisma } from '@/core/user/infrastructure/services/users-prisma.repository'
import { prisma } from '@/lib/prisma/prisma'

const Container = {
  init: () => {
    const users = new UsersPrisma(prisma)
    const books = new BooksPrisma(prisma)
    const loans = new LoansPrisma(prisma)
    const loanBookService = new LoanBookService(loans)
    const reviews = new ReviewsPrisma(prisma)
    const returnBookService = new ReturnBookService(loans)

    return {
      createBook: new CreateBookUseCase(books),
      createReview: new CreateReviewUseCase(reviews),
      editBook: new EditBookUseCase(books),
      enableUser: new EnableUserUseCase(users),
      findBook: new FindBookQuery(prisma),
      findBooks: new FindAllBooksQuery(prisma),
      findUser: new FindUserUseCase(users),
      findUsers: new FindAllUsersQuery(prisma),
      getHistoricalLoans: new GetHistoricalLoansQuery(prisma),
      getReviews: new GetReviewsQuery(prisma),
      getReviewsStats: new GetReviewStatsQuery(prisma),
      loanBook: new LoanBookUseCase(books, loanBookService),
      returnBook: new ReturnBookUseCase(books, returnBookService),
      updateSetting: new UpdateSettingUseCase(users),
      updateUser: new UpdateUserUseCase(users),
    }
  },
}

export const container = Container.init()
