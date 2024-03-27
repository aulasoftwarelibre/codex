import { Meta, StoryObj } from '@storybook/react'

import { BookViewBreadcrumbs } from '@/app/books/components/book-view-breadcrumbs'

const meta = {
  component: BookViewBreadcrumbs,
  title: 'Components/BookBreadcrumbs',
} satisfies Meta<typeof BookViewBreadcrumbs>

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
