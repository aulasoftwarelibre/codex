import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

import { FindUserResponse } from '@/core/user/application/types'
import gravatar from '@/lib/utils/gravatar'

export interface BookProps {
  authors: string[]
  id: string
  image: string
  onBorrow: (id: string) => void
  reader: FindUserResponse | null
  title: string
}

export default function Book(props: BookProps) {
  const { authors, id, image, onBorrow, reader, title } = props

  const footer = reader ? (
    <div className="flex flex-row-reverse w-full gap-4 items-center">
      <Avatar src={gravatar(reader.email || '')} />
      <div>Prestado a</div>
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
        <CardFooter className="flex flex-col items-start gap-4 h-[180px]">
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold">
            {title}
          </div>
          <div className="text-sm">{authors.join(', ')}</div>
          {footer}
        </CardFooter>
      </Card>
    </>
  )
}
