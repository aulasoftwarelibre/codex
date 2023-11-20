import { Kbd } from '@nextui-org/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthModalFooter from '@/components/AuthModal/AuthModalFooter'
import AuthModalHeader from '@/components/AuthModal/AuthModalHeader'
import SignInEmailForm from '@/components/SignInEmailForm/SignInEmailForm'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex | Login',
}

export default async function Page() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <AuthModalHeader title="Iniciar sesión en">
        <SignInEmailForm />
      </AuthModalHeader>
      <AuthModalFooter>
        Esta plataforma es exclusiva para miembros de la Universidad de Córdoba.
        Inicia sesión con tu correo corporativo <Kbd>@uco.es</Kbd> para tener
        acceso.
      </AuthModalFooter>
    </>
  )
}
