import {
  AdjustmentsHorizontalIcon,
  ArrowLeftEndOnRectangleIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { User } from '@nextui-org/user'

import { UserResponse } from '@/core/user/dto/responses/user.response'
import { gravatar } from '@/lib/utils/gravatar'

interface HeaderAuthenticatedMenuProperties {
  user: UserResponse
}

const OPTIONS = [
  { key: 'profile', roles: ['ROLE_USER'], url: '/settings/profile' },
  { key: 'add_book', roles: ['ROLE_ADMIN'], url: '/books/new' },
  { key: 'admin', roles: ['ROLE_ADMIN'], url: '/admin/users' },
  { key: 'signout', roles: ['ROLE_USER'], url: '/signout' },
]

export function HeaderAuthenticatedMenu(
  properties: HeaderAuthenticatedMenuProperties,
) {
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
            fallback={<UserIcon height={24} width={24} />}
            showFallback
            size="md"
            src={image || gravatar(email as string)}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile actions"
          disabledKeys={disabledKeys}
          variant="flat"
        >
          <DropdownItem href="/settings/profile" key="profile">
            <User
              avatarProps={{
                src: gravatar(email as string),
              }}
              description={email}
              name={name || 'Bienvenido'}
            />
          </DropdownItem>
          <DropdownItem
            href="/books/new"
            key="add_book"
            startContent={<PlusIcon height={24} width={24} />}
          >
            Añadir libro
          </DropdownItem>
          <DropdownItem
            href="/admin/users"
            key="admin"
            startContent={<AdjustmentsHorizontalIcon height={24} width={24} />}
          >
            Administrar
          </DropdownItem>
          <DropdownItem
            href="/signout"
            key="signout"
            startContent={
              <ArrowLeftEndOnRectangleIcon height={24} width={24} />
            }
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
