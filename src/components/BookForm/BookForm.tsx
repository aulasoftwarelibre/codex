'use client'

import { Divider, Input } from '@nextui-org/react'

import SubmitButton from '@/components/SubmitButton/SubmitButton'

export default function BookForm() {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-full">
          <Input
            label="Título"
            labelPlacement="outside"
            name="title"
            placeholder="Título"
            radius="none"
            size="lg"
            isRequired
          />
          <Input
            label="Autores"
            labelPlacement="outside"
            name="authors"
            placeholder="Autores"
            radius="none"
            size="lg"
            isRequired
            description="Separados por comas"
          />
          <Input
            label="Imagen"
            labelPlacement="outside"
            name="image"
            placeholder="Imagen"
            radius="none"
            size="lg"
            isRequired
            description="Introduzca la url de la portada del libro"
          />
          <Divider className="col-span-1 md:col-span-2" />
        </div>
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
