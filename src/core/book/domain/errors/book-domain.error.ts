import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'
import IdError from '@/core/common/domain/value-objects/id/id.error'
import ImageError from '@/core/common/domain/value-objects/image/image.error'
import TitleError from '@/core/common/domain/value-objects/title/title.error'

type BookDomainError = IdError | TitleError | FullNameError | ImageError

export default BookDomainError
