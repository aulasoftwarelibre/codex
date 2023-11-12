import { Session } from '@auth/core/types'
import {
  ArrowLeftOnRectangleIcon,
  BookOpenIcon,
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

import gravatar from '@/lib/utils/gravatar'

interface HeaderAuthenticatedMenuProps {
  session: Session
}

export default function HeaderAuthenticatedMenu(
  props: HeaderAuthenticatedMenuProps,
) {
  const router = useRouter()
  const {
    session: { user: { email, image, name } = {} },
  } = props

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
          <DropdownItem key="profile">
            <User
              name={name || 'Bienvenido'}
              description={email}
              avatarProps={{
                src: gravatar(email as string),
              }}
            />
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
