import { Meta, StoryObj } from '@storybook/react'

import SettingsForm from '@/components/settings-form/settings-form'
import SettingsFormInputText from '@/components/settings-form/settings-form-input-text'
import UserResponse from '@/core/user/dto/responses/user.response'

const meta = {
  component: SettingsFormInputText,
  decorators: [
    (Story) => (
      <SettingsForm title="Nombre visible">
        <Story />
      </SettingsForm>
    ),
  ],
  title: 'Components/SettingsFormInputText',
} satisfies Meta<typeof SettingsFormInputText>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    field: 'name',
    inputProperties: {
      label: 'Indica tu nombre completo',
    },
    status: 'Máximo 64 caracteres.',
    user: {
      name: 'Jane Doe',
    } as UserResponse,
  },
}
