import { ulid as base } from 'ulid'

export function ulid(index: number) {
  return base().slice(0, 14) + suffix(index)
}

export function suffix(index: number) {
  return 'WORKER' + String(index).padStart(4, '0')
}

export default ulid
