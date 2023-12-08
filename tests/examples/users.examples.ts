import { ulid } from 'ulid'

import UserDataMapper from '@/core/user/infrastructure/persistence/user.data-mapper'
import gravatar from '@/lib/utils/gravatar'

const UsersExamples = {
  basic: () =>
    UserDataMapper.toModel({
      email: 'test@example.com',
      id: ulid(),
      image: gravatar('test@example.com'),
      name: 'Test User',
      roles: ['ROLE_USER'],
      version: 0,
    }),
}

export default UsersExamples
