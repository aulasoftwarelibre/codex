import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  revalidatePath('/')

  return NextResponse.json({ success: true })
}
