import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthCard from '@/app/(auth)/_components/auth-card/auth-card'
import AuthCardHeader from '@/app/(auth)/_components/auth-card/auth-card-header'
import SignOutForm from '@/app/(auth)/signout/_components/sign-out-form/sign-out-form'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Cerrar sesión | Codex',
}

export default async function Page() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  return (
    <>
      <AuthCard>
        <AuthCardHeader title="Cerrar sesión en">
          <SignOutForm />
        </AuthCardHeader>
      </AuthCard>
    </>
  )
}
