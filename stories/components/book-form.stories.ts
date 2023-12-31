import { Meta, StoryObj } from '@storybook/react'

import BookForm from '@/components/book-form/book-form'

const meta = {
  component: BookForm,
  title: 'Components/BookForm',
} satisfies Meta<typeof BookForm>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
