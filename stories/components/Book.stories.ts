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
    id: '23423432',
    image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
    reader: null,
    title: 'Designing Data-Intensive Applications',
  },
}

export const Borrowed: Story = {
  args: {
    authors: ['Martin Kleppmann'],
    id: '23423432',
    image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
    reader: {
      email: 'johndoe@example.com',
      image: '',
      name: 'John Doe',
      roles: ['ROLE_USER'],
    },
    title: 'Designing Data-Intensive Applications',
  },
}
