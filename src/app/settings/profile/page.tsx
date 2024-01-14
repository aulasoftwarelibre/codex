import { redirect } from 'next/navigation'

import SettingsForm from '@/components/settings-form/settings-form'
import SettingsFormInputText from '@/components/settings-form/settings-form-input-text'
import UserResponse from '@/core/user/dto/responses/user.response'
import { findUser } from '@/core/user/infrastructure/actions/find-user'
import { auth } from '@/lib/auth/auth'

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
