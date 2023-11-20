import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthModalHeader from '@/components/AuthModal/AuthModalHeader'
import SignOutForm from '@/components/SignOutForm/SignOutForm'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex | Cerrar sesión',
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
