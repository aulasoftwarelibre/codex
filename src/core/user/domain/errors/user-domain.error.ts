import EmailError from '@/core/common/domain/value-objects/email/email.error'
import FullNameError from '@/core/common/domain/value-objects/fullname/fullname.error'
import ImageError from '@/core/common/domain/value-objects/image/image.error'
import RoleError from '@/core/common/domain/value-objects/role/role.error'

type UserDomainError = EmailError | RoleError | FullNameError | ImageError

export default UserDomainError
