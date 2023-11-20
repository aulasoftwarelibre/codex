import { Button } from '@nextui-org/react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthModalFooter from '@/components/AuthModal/AuthModalFooter'
import AuthModalHeader from '@/components/AuthModal/AuthModalHeader'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Codex | Verifica tu correo',
}

export default async function Page() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <AuthModalHeader title="Iniciar sesión en">
        <p className="text-3xl font-black text-center">Verifica tu correo</p>
        <Button
          size="lg"
          radius="none"
          as={Link}
          href="https://webmail.uco.es"
          target="_blank"
        >
          Abrir UCOWebMail
        </Button>
      </AuthModalHeader>
      <AuthModalFooter>
        Se ha enviado un enlace de inicio de sesión a la dirección de correo
        electrónico que proporcionaste. Este enlace te permitirá acceder al
        proceso de inicio de sesión. Por favor, revisa tu bandeja de entrada y
        posiblemente también la carpeta de spam, en caso de que no encuentres el
        correo electrónico en la bandeja principal.
      </AuthModalFooter>
    </>
  )
}
