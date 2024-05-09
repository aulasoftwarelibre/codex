type CreateReviewRequest = {
  bookId: string
  description: string
  id: string
  score: number
  title: string
  userId: string
}

const CreateReviewRequest = {
  with: (properties: CreateReviewRequest): CreateReviewRequest => properties,
}

export { CreateReviewRequest }
