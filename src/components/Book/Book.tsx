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
        <CardBody>
          <Image alt={title} width={297} height={387} src={image} />
        </CardBody>
        <CardFooter className="flex flex-col items-start">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-sm">{authors.join(', ')}</div>
        </CardFooter>
      </Card>
    </>
  )
}
