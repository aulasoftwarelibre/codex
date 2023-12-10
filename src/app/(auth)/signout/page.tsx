import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthModalHeader from '@/components/auth-modal/auth-modal-header'
import SignOutForm from '@/components/sign-out-form/sign-out-form'
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
      <AuthModalHeader title="Cerrar sesión en">
        <SignOutForm />
      </AuthModalHeader>
    </>
  )
}
