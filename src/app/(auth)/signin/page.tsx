import { Kbd } from '@nextui-org/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import { AuthCard } from '@/app/(auth)/components/auth-card'
import { AuthCardFooter } from '@/app/(auth)/components/auth-card-footer'
import { AuthCardHeader } from '@/app/(auth)/components/auth-card-header'
import { SignInEmailForm } from '@/app/(auth)/components/sign-in-email-form'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Iniciar sesión | Codex',
}

export default async function Page() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <AuthCard>
        <AuthCardHeader title="Iniciar sesión en">
          <SignInEmailForm />
        </AuthCardHeader>
        <AuthCardFooter>
          Esta plataforma es exclusiva para miembros de la Universidad de
          Córdoba. Inicia sesión con tu correo corporativo <Kbd>@uco.es</Kbd>{' '}
          para tener acceso.
        </AuthCardFooter>
      </AuthCard>
    </>
  )
}
