import { Card } from '@nextui-org/card'
import React, { ReactNode } from 'react'

interface BookReviewStatsProperties {
  children: ReactNode
}

export function BookReviewStats({ children }: BookReviewStatsProperties) {
  return <Card shadow="sm">{children}</Card>
}
