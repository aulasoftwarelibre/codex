import { createHash } from 'crypto'

export default function gravatar(email: string | null) {
  if (!email) {
    return `http://www.gravatar.com/avatar`
  }

  const hash = createHash('sha256')
    .update(email.trim().toLowerCase())
    .digest('hex')

  return `https://gravatar.com/avatar/${hash}.jpg`
}
