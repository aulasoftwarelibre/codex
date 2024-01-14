import { Kbd } from '@nextui-org/react'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import AuthModal from '@/components/auth-modal/auth-modal'
import AuthModalFooter from '@/components/auth-modal/auth-modal-footer'
import AuthModalHeader from '@/components/auth-modal/auth-modal-header'

const meta = {
  component: AuthModal,
  title: 'Components/AuthModal',
} satisfies Meta<typeof AuthModal>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: (
      <>
        <AuthModalHeader title="Iniciar sesión en">
          Lorem ipsum...
        </AuthModalHeader>
        <AuthModalFooter>
          Esta plataforma es exclusiva para miembros de la Universidad de
          Córdoba. Inicia sesión con tu correo corporativo <Kbd>@uco.es</Kbd>{' '}
          para tener acceso.
        </AuthModalFooter>
      </>
    ),
  },
}
