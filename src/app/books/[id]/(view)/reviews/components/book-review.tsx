'use client'

import { User } from '@nextui-org/user'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'

import { StarIcon } from '@/components/image/star-icon'

interface BookReviewProperties {
  createdAt: string
  description: string
  score: number
  title: string
  user: {
    image: string
    name: string
  }
}

export function BookReview({
  createdAt,
  description,
  score,
  title,
  user,
}: BookReviewProperties) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <User
            avatarProps={{
              src: user.image,
            }}
            description={format(createdAt, "dd 'de' MMMM yyyy", { locale: es })}
            name={user.name}
          />
          <div className="flex flex-row">
            <StarIcon isActive size="md" />
            <StarIcon isActive={score >= 2} />
            <StarIcon isActive={score >= 3} />
            <StarIcon isActive={score >= 4} />
            <StarIcon isActive={score >= 5} />
          </div>
        </div>
        <div className="mt-4 w-full">
          <p className="font-medium text-default-900">{title}</p>
          <p className="mt-2 text-default-500">{description}</p>
        </div>
      </div>
    </>
  )
}
