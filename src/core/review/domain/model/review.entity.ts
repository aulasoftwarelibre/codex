import { AggregateRoot } from '@/core/common/domain/model/aggregate-root'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { Description } from '@/core/common/domain/value-objects/description'
import { ReviewId } from '@/core/common/domain/value-objects/review-id'
import { Score } from '@/core/common/domain/value-objects/score'
import { Title } from '@/core/common/domain/value-objects/title'
import { UserId } from '@/core/common/domain/value-objects/user-id'

export class Review extends AggregateRoot {
  constructor(
    protected _id: ReviewId,
    protected _bookId: BookId,
    protected _userId: UserId,
    protected _title: Title,
    protected _description: Description,
    protected _score: Score,
  ) {
    super()
  }

  get id(): ReviewId {
    return this._id
  }

  get bookId(): BookId {
    return this._bookId
  }

  get userId(): UserId {
    return this._userId
  }

  get title(): Title {
    return this._title
  }

  get description(): Description {
    return this._description
  }

  get score(): Score {
    return this._score
  }
}
