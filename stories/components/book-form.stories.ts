import { Meta, StoryObj } from '@storybook/react'

import { BookViewForm } from '@/app/books/components/book-view-form'

const meta = {
  component: BookViewForm,
  title: 'Components/BookForm',
} satisfies Meta<typeof BookViewForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
