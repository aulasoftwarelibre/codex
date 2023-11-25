import { Meta, StoryObj } from '@storybook/react'

import BookGrid from '@/components/book-grid'

const meta = {
  component: BookGrid,
  title: 'Components/BookGrid',
} satisfies Meta<typeof BookGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    books: [
      {
        authors: ['Martin Fowler'],
        id: '3',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Refactoring: Improving the Design of Existing Code',
      },
      {
        authors: ['Andrew S. Tanenbaum', 'Andrew S. Tanenbaum'],
        id: '4',
        image: 'https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg',
        title: 'Computer Networks',
      },
    ],
  },
}
