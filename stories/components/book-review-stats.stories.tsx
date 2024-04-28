import { Meta, StoryObj } from '@storybook/react'

import { BookReviewStats } from '@/app/books/[id]/(view)/reviews/components/book-review-stats'

const meta = {
  component: BookReviewStats,
  title: 'Components/BookReviewStats',
} satisfies Meta<typeof BookReviewStats>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    reviewsStats: [
      { reviews: 13, score: 5 },
      { reviews: 25, score: 4 },
      { reviews: 20, score: 3 },
      { reviews: 5, score: 2 },
      { reviews: 10, score: 1 },
    ],
  },
}
