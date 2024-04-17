import { Avatar } from '@nextui-org/avatar'
import { Link } from '@nextui-org/link'
import { redirect } from 'next/navigation'

import { SettingsForm } from '@/app/settings/components/settings-form'
import { SettingsFormInputText } from '@/app/settings/components/settings-form-input-text'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { findUser } from '@/core/user/infrastructure/actions/find-user'
import { auth } from '@/lib/auth/auth'
import { gravatar } from '@/lib/utils/gravatar'

export default async function Page() {
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    return redirect('/')
  }

  const user = (await findUser(email)) as UserResponse

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <SettingsForm title="Imagen de perfil">
          <div className="flex justify-between">
            <div className="flex-1">
              <p>Esta es tu imagen de perfil.</p>
              <p>
                Por el momento solo es posible cambiarla a través de{' '}
                <Link href="https://gravatar.com">gravatar</Link> y asociando el
                mismo correo con el que has iniciado sesión.
              </p>
            </div>
            <Avatar size="lg" src={user.image || gravatar(user.email)} />
          </div>
        </SettingsForm>

        <SettingsForm title="Nombre visible">
          <div>Introduce tu nombre completo o con el que más se te conoce.</div>
          <SettingsFormInputText
            field="name"
            inputProperties={{
              isRequired: true,
            }}
            status="Máximo 64 caracteres."
            user={user}
          />
        </SettingsForm>

        <SettingsForm title="Dirección de correo electrónico">
          <div>Esta es la dirección de acceso a la plataforma.</div>
          <SettingsFormInputText
            field="email"
            inputProperties={{
              isDisabled: true,
            }}
            status="Este campo no se puede modificar."
            user={user}
          />
        </SettingsForm>
      </div>
    </>
  )
}
