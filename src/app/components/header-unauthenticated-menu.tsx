import { Bars2Icon, UserIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function HeaderUnauthenticatedMenu() {
  const router = useRouter()

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            size="md"
            showFallback
            fallback={<Bars2Icon width={24} height={24} />}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile actions" variant="flat">
          <DropdownItem
            key="signin"
            startContent={<UserIcon width={24} height={24} />}
            onClick={() => router.push('/signin')}
          >
            Iniciar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
