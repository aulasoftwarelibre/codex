import { redirect } from 'next/navigation'

interface PageParameters {
  id: string
}

export default async function Page({
  params: { id },
}: {
  params: PageParameters
}) {
  return redirect(`/books/${id}/reviews`)
}
