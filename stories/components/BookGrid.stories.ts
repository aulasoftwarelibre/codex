import { Meta, StoryObj } from '@storybook/react'

import BookGrid from '@/components/BookGrid/BookGrid'

const meta = {
  component: BookGrid,
  title: 'Components/BookGrid',
} satisfies Meta<typeof BookGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
