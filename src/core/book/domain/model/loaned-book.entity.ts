import { Book, BookState } from '@/core/book/domain/model/book.entity'
import { BookId } from '@/core/common/domain/value-objects/book-id'
import { FullNames } from '@/core/common/domain/value-objects/fullnames'
import { Image } from '@/core/common/domain/value-objects/image'
import { Title } from '@/core/common/domain/value-objects/title'
import { Loan } from '@/core/loan/domain/model/loan.entity'
import { ReturnBookService } from '@/core/loan/domain/services/return-book.service'

export class LoanedBook extends Book {
  constructor(
    protected _id: BookId,
    protected _title: Title,
    protected _authors: FullNames,
    protected _image: Image,
    protected _loan: Loan,
  ) {
    super(_id, _title, _authors, _image, BookState.LOANED)
  }

  async doAvailable(returnBookService: ReturnBookService): Promise<void> {
    this._state = BookState.AVAILABLE

    return returnBookService.with(this)
  }
}
