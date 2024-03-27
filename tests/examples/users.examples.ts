import { ulid } from 'ulid'

import { UserDataMapper } from '@/core/user/infrastructure/persistence/user.data-mapper'
import { gravatar } from '@/lib/utils/gravatar'

export const UsersExamples = {
  basic: () =>
    UserDataMapper.toModel({
      email: 'test@example.com',
      id: ulid(),
      image: gravatar('test@example.com'),
      name: 'Test User',
      roles: ['ROLE_USER'],
      version: 0,
    }),
  member: () =>
    UserDataMapper.toModel({
      email: 'member@example.com',
      id: ulid(),
      image: gravatar('member@example.com'),
      name: 'Member User',
      roles: ['ROLE_USER', 'ROLE_MEMBER'],
      version: 0,
    }),
}
