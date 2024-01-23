import { Meta, StoryObj } from '@storybook/react'

import SettingsTemplate from '@/app/settings/_components/settings-template/settings-template'

const meta = {
  component: SettingsTemplate,
  title: 'Templates/SettingsTemplate',
} satisfies Meta<typeof SettingsTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: <>Perfil</>,
    pathname: '/settings/profile',
    tabs: [
      {
        target: 'profile',
        title: 'Perfil',
      },
      {
        target: 'delete-account',
        title: 'Borrar cuenta',
      },
    ],
  },
}
