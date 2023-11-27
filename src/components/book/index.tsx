import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

import BookResponse from '@/core/book/dto/responses/book.response'

export interface BookProperties {
  book: BookResponse
}

export default async function Book(properties: BookProperties) {
  const {
    book: { authors, image, title },
  } = properties

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
        </CardFooter>
      </Card>
    </>
  )
}
