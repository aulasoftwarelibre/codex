'use client'

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface BookBreadcrumbsProperties {
  title: string
}

export default function BookBreadcrumbs(properties: BookBreadcrumbsProperties) {
  const router = useRouter()
  router.prefetch('/')

  const { title } = properties

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem onClick={() => router.push('/')}>Inicio</BreadcrumbItem>
        <BreadcrumbItem>{title}</BreadcrumbItem>
      </Breadcrumbs>
    </>
  )
}
