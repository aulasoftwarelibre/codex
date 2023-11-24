'use server'

import { z } from 'zod'

import container from '@/lib/container'

import {
  CreateBookCommand,
  CreateBookResponse,
  FindBookResponse,
} from '../application/types'
import BookId from '../domain/model/id.value-object'

const CreateFormSchema = z.object({
  authors: z.string().min(3),
  image: z.string().min(3),
  title: z.string().min(3),
})

export async function findBooks(): Promise<FindBookResponse[]> {
  return container.findBooks.with()
}

export async function createBook(
  prevState: unknown,
  formData: FormData,
): Promise<CreateBookResponse> {
  const id = BookId.generate()
  const { authors, image, title } = CreateFormSchema.parse({
    authors: formData.get('authors'),
    image: formData.get('image'),
    title: formData.get('title'),
  })

  await container.createBook.with(
    new CreateBookCommand(id.value, title, authors.split(', '), image),
  )

  return {
    message: 'good',
    success: true,
  }
}
