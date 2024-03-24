import { PostgreSqlTestContainer } from '@/tests/containers/postgres-sql.testcontainer'

export async function setup(): Promise<void> {
  try {
    await PostgreSqlTestContainer.getInstance().start()
  } catch (error) {
    throw new Error('Error during starting PostgreSql test container', {
      cause: error,
    })
  }
}

export async function teardown(): Promise<void> {
  await PostgreSqlTestContainer.getInstance().stop()
}
