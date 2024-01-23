import { Meta, StoryObj } from '@storybook/react'

import SettingsFormInputSubmit from '@/app/settings/profile/_components/settings-form/settings-form-input-submit'

const meta = {
  component: SettingsFormInputSubmit,
  title: 'Components/SettingsFormFooter',
} satisfies Meta<typeof SettingsFormInputSubmit>

export default meta
type Story = StoryObj<typeof meta>

export const Enabled: Story = {
  args: {
    isDisabled: false,
    status: 'Máximo 32 caracteres.',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    status: 'Máximo 32 caracteres.',
  },
}
