import Container from '@/lib/container/container'

export const globalForContainer = global as unknown as {
  container: typeof Container
}

const container = globalForContainer.container || Container

if (process.env.NODE_ENV !== 'production')
  globalForContainer.container = container

export default container
