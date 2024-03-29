import { Meta, StoryObj } from '@storybook/react'

import { ThemeSwitcher } from '@/app/components/theme-switcher'

const meta = {
  component: ThemeSwitcher,
  title: 'Components/ThemeSwitcher',
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
