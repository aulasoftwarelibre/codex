import { DeepReadonly } from 'ts-essentials'

type ReviewStatsResponse = DeepReadonly<{
  reviews: number
  score: number
}>

const ReviewStatsResponse = {
  fromRawQuery: ({
    reviews,
    score,
  }: {
    reviews: number
    score: number
  }): ReviewStatsResponse => {
    return {
      reviews,
      score,
    }
  },
}

export { ReviewStatsResponse }
