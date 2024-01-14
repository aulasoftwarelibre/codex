import { Meta, StoryObj } from '@storybook/react'

import SettingsForm from '@/components/settings-form/settings-form'

const meta = {
  component: SettingsForm,
  title: 'Components/SettingsForm',
} satisfies Meta<typeof SettingsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: <>Form</>,
    title: 'Title Form',
  },
}
