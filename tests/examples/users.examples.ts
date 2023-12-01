import UserFactory from '@/core/user/domain/model/user.factory'
import gravatar from '@/lib/utils/gravatar'

const UsersExamples = {
  basic: () =>
    UserFactory.create({
      email: 'test@example.com',
      image: gravatar('test@example.com'),
      name: 'Test User',
      roles: ['ROLE_USER'],
    })._unsafeUnwrap(),
}

export default UsersExamples
