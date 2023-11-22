import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export interface BookProps {
  authors: string[]
  image: string
  title: string
}

export default function Book(props: BookProps) {
  const { authors, image, title } = props

  return (
    <>
      <Card className="max-w-[320px]">
        <CardBody className="h-[400px] overflow-y-hidden object-center">
          <Image alt={title} width={297} height={387} src={image} />
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-4 h-[150px]">
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold">
            {title}
          </div>
          <div className="text-sm">{authors.join(', ')}</div>
        </CardFooter>
      </Card>
    </>
  )
}
