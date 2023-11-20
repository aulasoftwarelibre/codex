import { Button, Divider, Input } from '@nextui-org/react'
import { redirect } from 'next/navigation'

import { find, update } from '@/core/user/infrastructure/actions'
import { auth } from '@/lib/auth/auth'

export default async function Page() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  const user = await find(session.user?.email as string)

  return (
    <>
      <form className="flex flex-col gap-4" action={update}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
          <Input
            label="Nombre"
            labelPlacement="outside"
            name="name"
            defaultValue={user.name || ''}
            placeholder="Nombre"
            radius="none"
            size="lg"
            isRequired
          />
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            name="email"
            defaultValue={user.email || ''}
            placeholder="Correo electrónico"
            radius="none"
            size="lg"
            isReadOnly
          />
          <Divider className="col-span-1 md:col-span-2" />
        </div>
        <div className="flex flex-row-reverse">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </>
  )
}
