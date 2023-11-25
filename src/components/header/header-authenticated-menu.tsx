import {
  ArrowLeftOnRectangleIcon,
  BookOpenIcon,
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

import { FindUserResponse } from '@/core/user/application/types'
import gravatar from '@/lib/utils/gravatar'

interface HeaderAuthenticatedMenuProperties {
  user: FindUserResponse
}

export default function HeaderAuthenticatedMenu(
  properties: HeaderAuthenticatedMenuProperties,
) {
  const router = useRouter()
  const {
    user: { email, image, name },
  } = properties

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
        <DropdownMenu aria-label="Profile actions" variant="flat">
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
            key="books"
            startContent={<BookOpenIcon width={24} height={24} />}
          >
            Mis libros
          </DropdownItem>
          <DropdownItem
            key="signout"
            onClick={() => router.push('/signout')}
            startContent={<ArrowLeftOnRectangleIcon width={24} height={24} />}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
