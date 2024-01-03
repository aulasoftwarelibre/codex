import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  revalidateTag('books')
  revalidateTag('users')

  return NextResponse.json({ success: true })
}
