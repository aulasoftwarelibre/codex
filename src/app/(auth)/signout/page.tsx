import { Metadata } from 'next'
import React from 'react'

import AuthModalHeader from '@/components/AuthModal/AuthModalHeader'
import SignOutForm from '@/components/SignOutForm/SignOutForm'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex | Cerrar sesión',
}

export default async function Page() {
  return (
    <>
      <AuthModalHeader title="Cerrar sesión en">
        <SignOutForm />
      </AuthModalHeader>
    </>
  )
}
