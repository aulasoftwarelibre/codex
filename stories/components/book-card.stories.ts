import { Meta, StoryObj } from '@storybook/react'

import BookCard from '@/components/book-card/book-card'
import BookResponse from '@/core/book/dto/responses/book.response'
import UserResponse from '@/core/user/dto/responses/user.response'
import gravatar from '@/lib/utils/gravatar'

const meta = {
  component: BookCard,
  title: 'Components/BookCard',
} satisfies Meta<typeof BookCard>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {
  args: {
    book: {
      authors: ['Martin Kleppmann'],
      id: '23423432',
      image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
      title: 'Designing Data-Intensive Applications',
    },
    me: {
      id: 'me',
    } as UserResponse,
  },
}

export const LoanedByMe: Story = {
  args: {
    book: {
      authors: ['Martin Kleppmann'],
      id: '23423432',
      image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
      loan: {
        user: {
          id: 'me',
          image: gravatar('sergio@uco.es'),
        },
      },
      title: 'Designing Data-Intensive Applications',
    } as unknown as BookResponse,
    me: {
      id: 'me',
    } as UserResponse,
  },
}

export const Loaned: Story = {
  args: {
    book: {
      authors: ['Martin Kleppmann'],
      id: '23423432',
      image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
      loan: {
        user: {
          id: 'not me',
          image: gravatar('sergio@uco.es'),
        },
      },
      title: 'Designing Data-Intensive Applications',
    } as unknown as BookResponse,
    me: {
      id: 'me',
    } as UserResponse,
  },
}
