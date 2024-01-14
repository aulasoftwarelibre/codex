import { Meta, StoryObj } from '@storybook/react'

import BookCard from '@/components/book-card/book-card'

const meta = {
  component: BookCard,
  title: 'Components/BookCard',
} satisfies Meta<typeof BookCard>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {
  args: {
    book: {
      authors: ['Jane Doe'],
      id: 'book',
      image: '/images/book.jpeg',
      title: 'A book',
    },
  },
}

export const Unavailable: Story = {
  args: {
    book: {
      authors: ['Jane Doe'],
      id: 'book',
      image: '/images/book.jpeg',
      loan: {
        id: 'load',
        startsAt: new Date(),
        user: {
          id: 'user',
          image: '/images/avatar.png',
          name: 'Jane Doe',
        },
      },
      title: 'A book',
    },
  },
}

export const Loaned: Story = {
  args: {
    book: {
      authors: ['Jane Doe'],
      id: 'book',
      image: '/images/book.jpeg',
      loan: {
        id: 'load',
        startsAt: new Date(),
        user: {
          id: 'user',
          image: '/images/avatar.png',
          name: 'Jane Doe',
        },
      },
      title: 'A book',
    },
    me: {
      email: 'janedoe@example.com',
      id: 'user',
      image: '/images/avatar.png',
      name: 'Jane Doe',
      roles: ['ROLE_USER'],
    },
  },
}
