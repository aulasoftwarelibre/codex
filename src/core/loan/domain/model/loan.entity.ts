import AggregateRoot from '@/core/common/domain/model/aggregate-root'
import BookId from '@/core/common/domain/value-objects/book-id'
import LoanId from '@/core/common/domain/value-objects/loan-id'
import UserId from '@/core/common/domain/value-objects/user-id'

export default class Loan extends AggregateRoot {
  constructor(
    private _id: LoanId,
    private _bookId: BookId,
    private _userId: UserId,
    private _startsAt: Date,
  ) {
    super()
  }

  get id(): LoanId {
    return this._id
  }

  get bookId(): BookId {
    return this._bookId
  }

  get userId(): UserId {
    return this._userId
  }

  get startsAt(): Date {
    return this._startsAt
  }
}
