import { Bars2Icon, UserIcon } from '@heroicons/react/24/outline'
import { Avatar } from '@nextui-org/avatar'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'

export function HeaderUnauthenticatedMenu() {
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
            href="/signin"
            key="signin"
            startContent={<UserIcon height={24} width={24} />}
          >
            Iniciar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
