import { createHash } from 'crypto'

export default function gravatar(email: string) {
  const hash = createHash('sha256')
    .update(email.trim().toLowerCase())
    .digest('hex')

  return `https://gravatar.com/avatar/${hash}.jpg`
}
