import { Kbd } from '@nextui-org/react'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { AuthCard } from '@/app/(auth)/components/auth-card'
import { AuthCardFooter } from '@/app/(auth)/components/auth-card-footer'
import { AuthCardHeader } from '@/app/(auth)/components/auth-card-header'

const meta = {
  component: AuthCard,
  title: 'Components/AuthModal',
} satisfies Meta<typeof AuthCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: (
      <>
        <AuthCardHeader title="Iniciar sesión en">
          Lorem ipsum...
        </AuthCardHeader>
        <AuthCardFooter>
          Esta plataforma es exclusiva para miembros de la Universidad de
          Córdoba. Inicia sesión con tu correo corporativo <Kbd>@uco.es</Kbd>{' '}
          para tener acceso.
        </AuthCardFooter>
      </>
    ),
  },
}
