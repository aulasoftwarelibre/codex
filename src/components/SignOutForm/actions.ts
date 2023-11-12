'use server'

import { signOut } from '@/lib/auth/auth'

export async function form() {
  try {
    return signOut({ redirectTo: '/' })
  } catch (error) {
    console.error(`ERROR IN SIGN OUT: ${(error as Error).toString()}`)
    if ((error as Error).message) {
      return (error as Error).message
    }

    throw error
  }
}
