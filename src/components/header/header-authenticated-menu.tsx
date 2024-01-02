import {
  AdjustmentsHorizontalIcon,
  ArrowLeftEndOnRectangleIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import UserResponse from '@/core/user/dto/responses/user.response'
import gravatar from '@/lib/utils/gravatar'

interface HeaderAuthenticatedMenuProperties {
  user: UserResponse
}

const OPTIONS = [
  { key: 'profile', roles: ['ROLE_USER'], url: '/settings/profile' },
  { key: 'add_book', roles: ['ROLE_ADMIN'], url: '/books/new' },
  { key: 'admin', roles: ['ROLE_ADMIN'], url: '/admin/users' },
  { key: 'signout', roles: ['ROLE_USER'], url: '/signout' },
]

export default function HeaderAuthenticatedMenu(
  properties: HeaderAuthenticatedMenuProperties,
) {
  const router = useRouter()
  const {
    user: { email, image, name, roles },
  } = properties

  const disabledKeys = OPTIONS.filter(
    (option) => !option.roles.some((role) => roles.includes(role)),
  ).map((option) => option.key)

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            size="md"
            showFallback
            src={image || gravatar(email as string)}
            fallback={<UserIcon width={24} height={24} />}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile actions"
          variant="flat"
          disabledKeys={disabledKeys}
        >
          <DropdownItem
            key="profile"
            onClick={() => router.push('/settings/profile')}
          >
            <User
              name={name || 'Bienvenido'}
              description={email}
              avatarProps={{
                src: gravatar(email as string),
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="add_book"
            startContent={<PlusIcon width={24} height={24} />}
            onClick={() => router.push('/books/new')}
          >
            Añadir libro
          </DropdownItem>
          <DropdownItem
            key="admin"
            startContent={<AdjustmentsHorizontalIcon width={24} height={24} />}
            onClick={() => router.push('/admin/users')}
          >
            Administrar
          </DropdownItem>
          <DropdownItem
            key="signout"
            onClick={() => router.push('/signout')}
            startContent={
              <ArrowLeftEndOnRectangleIcon width={24} height={24} />
            }
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
