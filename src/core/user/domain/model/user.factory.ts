import { Email } from '@/core/common/domain/value-objects/email'
import { FullName } from '@/core/common/domain/value-objects/fullname'
import { Image } from '@/core/common/domain/value-objects/image'
import { Roles } from '@/core/common/domain/value-objects/roles'
import { UserId } from '@/core/common/domain/value-objects/user-id'
import { User } from '@/core/user/domain/model/user.entity'
import { UserResponse } from '@/core/user/dto/responses/user.response'

export const UserFactory = {
  create: (userResponse: UserResponse): User => {
    const id = UserId.create(userResponse.id)
    const email = Email.create(userResponse.email)
    const roles = Roles.create(userResponse.roles)
    const name = FullName.create(userResponse.name)
    const image = Image.create(userResponse.image)
    return new User(id, email, roles, name, image)
  },
}
