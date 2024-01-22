import { Button } from '@nextui-org/react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import AuthModal from '@/components/auth-modal/auth-modal'
import AuthModalFooter from '@/components/auth-modal/auth-modal-footer'
import AuthModalHeader from '@/components/auth-modal/auth-modal-header'
import { auth } from '@/lib/auth/auth'

export const metadata: Metadata = {
  description: 'Biblioteca del Aula de Software Libre',
  title: 'Verifica tu correo | Codex',
}

const WEBMAIL_URL = process.env.WEBMAIL_URL as string

export default async function Page() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <AuthModal>
        <AuthModalHeader title="Iniciar sesión en">
          <p className="text-3xl font-black text-center">Verifica tu correo</p>
          <Button
            size="lg"
            radius="none"
            as={Link}
            href={WEBMAIL_URL}
            target="_blank"
          >
            Abrir UCOWebMail
          </Button>
        </AuthModalHeader>
        <AuthModalFooter>
          Se ha enviado un enlace de inicio de sesión a la dirección de correo
          electrónico que proporcionaste. Este enlace te permitirá acceder al
          proceso de inicio de sesión. Por favor, revisa tu bandeja de entrada y
          posiblemente también la carpeta de spam, en caso de que no encuentres
          el correo electrónico en la bandeja principal.
        </AuthModalFooter>
      </AuthModal>
    </>
  )
}
