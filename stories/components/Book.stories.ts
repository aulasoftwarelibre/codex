import { Meta, StoryObj } from '@storybook/react'

import Book from '@/components/Book/Book'

const meta = {
  component: Book,
  title: 'Components/Book',
} satisfies Meta<typeof Book>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    authors: ['Martin Kleppmann'],
    image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
    title: 'Designing Data-Intensive Applications',
  },
}
