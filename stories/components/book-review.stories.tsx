import { Meta, StoryObj } from '@storybook/react'

import { BookReview } from '@/app/books/[id]/(view)/reviews/components/book-review'
import { gravatar } from '@/lib/utils/gravatar'

const meta = {
  component: BookReview,
  title: 'Components/BookReview',
} satisfies Meta<typeof BookReview>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    createdAt: '2024-01-01T12:00:00.000Z',
    description:
      'Es una lectura obligada para cualquier persona que aspire a ser un profesional destacado en el campo del desarrollo de software. Te desafía a pensar de manera diferente y te inspira a alcanzar nuevos niveles de excelencia en tu trabajo',
    score: 5,
    title: 'Un gran libro',
    user: {
      image: gravatar('johndoe@example.com'),
      name: 'John Doe',
    },
  },
}
