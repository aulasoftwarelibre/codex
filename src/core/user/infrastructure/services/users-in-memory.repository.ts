import User from '@/core/user/domain/model/user.entity'
import Users from '@/core/user/domain/services/users.repository'

export default class UsersInMemory implements Users {
  private users: Map<string, User> = new Map()

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.get(email)
  }

  async save(user: User): Promise<void> {
    this.users.set(user.email, user)
  }

  purge(): void {
    this.users = new Map()
  }
}
