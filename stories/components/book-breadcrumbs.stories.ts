import { Meta, StoryObj } from '@storybook/react'

import BookBreadcrumbs from '@/components/book-breadcrumbs/book-breadcrumbs'

const meta = {
  component: BookBreadcrumbs,
  title: 'Components/BookBreadcrumbs',
} satisfies Meta<typeof BookBreadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Children',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
