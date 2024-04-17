import { Card, CardBody } from '@nextui-org/card'
import Image from 'next/image'
import Link from 'next/link'

import { BookCardForm } from '@/app/books/components/book-card-form'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { UserResponse } from '@/core/user/dto/responses/user.response'

interface BookCardProperties {
  book: BookResponse
  me?: UserResponse
}

const CardColor = {
  Available: 'border-t-green-600',
  Loaned: 'border-t-red-600',
  Owned: 'border-t-zinc-600',
}

export function BookCard(properties: BookCardProperties) {
  const { book, me } = properties

  const isLoaned = !!book.loan
  const isLogged = !!me
  const isOwned = isLoaned && isLogged && book.loan.user.id === me.id

  const cardColor = isOwned
    ? CardColor.Owned
    : isLoaned
      ? CardColor.Loaned
      : CardColor.Available

  return (
    <>
      <Card
        as={Link}
        className={`group max-w-[320px] space-y-4 border-t-4 p-4 ${cardColor}`}
        href={`/books/${book.id}`}
        isHoverable
        prefetch
        radius="none"
        role="gridcell"
      >
        <div className="relative">
          <Image
            alt={book.title}
            className="h-[297px] w-[320px] object-cover"
            height={387}
            priority={true}
            src={book.image}
            width={297}
          />
          <BookAvatar book={book} />
          <BookCardForm book={book} me={me} />
        </div>

        <CardBody className="p-0">
          <div className="line-clamp-1 hyphens-auto font-bold" lang="en">
            {book.title}
          </div>
          <div className="line-clamp-1 text-sm font-extralight">
            {book.authors.join(', ')}
          </div>
        </CardBody>
      </Card>
    </>
  )
}

function BookAvatar({ book }: { book: BookResponse }) {
  if (!book.loan) {
    return null
  }

  return (
    <Image
      alt="Avatar del poseedor del libro"
      className="absolute right-5 top-5 z-10 rounded-full"
      height={48}
      src={book.loan.user.image}
      width={48}
    />
  )
}
