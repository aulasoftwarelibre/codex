import User from '@/core/user/domain/model/user.entity'

export default interface Users {
  // Finds a user by email
  findByEmail(email: string): Promise<User | null>

  // Saves a user
  save(user: User): Promise<void>
}
