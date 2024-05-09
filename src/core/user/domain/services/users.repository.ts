import { Email } from '@/core/common/domain/value-objects/email'
import { User } from '@/core/user/domain/model/user.entity'

export interface Users {
  findByEmail(email: Email): Promise<User>
  save(user: User): Promise<void>
}
