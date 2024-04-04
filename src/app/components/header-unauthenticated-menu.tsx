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
            fallback={<Bars2Icon height={24} width={24} />}
            showFallback
            size="md"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile actions" variant="flat">
          <DropdownItem
            key="signin"
            onClick={() => router.push('/signin')}
            startContent={<UserIcon height={24} width={24} />}
          >
            Iniciar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
