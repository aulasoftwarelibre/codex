import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

import { BookDTO } from '@/core/book/application/types'
import { findBorrow } from '@/core/borrow/infrastructure/actions'
import gravatar from '@/lib/utils/gravatar'

export interface BookProperties {
  book: BookDTO
  onBorrow: (id: string) => void
}

export default async function Book(properties: BookProperties) {
  const {
    book: { authors, id, image, title },
    onBorrow,
  } = properties
  const { reader } = await findBorrow(id)

  const footer = reader ? (
    <div className="flex flex-row-reverse w-full gap-4 items-center">
      <Avatar size="sm" src={gravatar(reader.email || '')} />
      <div className="text-sm">Prestado a</div>
    </div>
  ) : (
    <div className="flex flex-row-reverse w-full">
      <Button onClick={() => onBorrow(id)}>Reservar</Button>
    </div>
  )

  return (
    <>
      <Card className="max-w-[320px]">
        <CardBody className="h-[400px] overflow-y-hidden object-center">
          <Image alt={title} width={297} height={387} src={image} />
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold h-[60px]">
            {title}
          </div>
          <div className="line-clamp-1 overflow-hidden text-ellipsis text-sm">
            {authors.join(', ')}
          </div>
          {footer}
        </CardFooter>
      </Card>
    </>
  )
}
