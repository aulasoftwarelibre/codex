import { exec } from 'child_process'
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers'
import { promisify } from 'util'

const DATABASE_NAME = 'codex_test'

const execAsync = promisify(exec)

export class PostgreSqlTestContainer {
  private static instance: PostgreSqlTestContainer
  private container?: StartedTestContainer

  private constructor() {}

  public static getInstance(): PostgreSqlTestContainer {
    if (!PostgreSqlTestContainer.instance) {
      PostgreSqlTestContainer.instance = new PostgreSqlTestContainer()
    }

    return PostgreSqlTestContainer.instance
  }

  public async start(): Promise<void> {
    if (this.container) {
      return
    }

    await this.initializePostgreSqlContainer()
    await this.initializeSchema()
  }

  public async stop(): Promise<void> {
    if (!this.container) {
      return
    }

    await this.container.stop()
    this.container = undefined
  }

  private async initializePostgreSqlContainer(): Promise<void> {
    const postgreSqlContainer = new GenericContainer('postgres:12')
      .withExposedPorts(5432)
      .withEnvironment({
        POSTGRES_DB: DATABASE_NAME,
        POSTGRES_HOST_AUTH_METHOD: 'trust',
      })
      .withName(`testcontainer-db-${process.pid}`)
      .withWaitStrategy(
        Wait.forLogMessage(/database system is ready to accept connections/),
      )

    this.container = await postgreSqlContainer.start()
    this.configureDatabaseConnectionUrl(this.container)
  }

  private async initializeSchema(): Promise<void> {
    try {
      await execAsync('pnpm dlx prisma migrate deploy')
    } catch (error) {
      throw new Error('Error during creating schema', {
        cause: error,
      })
    }
  }

  private configureDatabaseConnectionUrl(container: StartedTestContainer) {
    const host = container.getHost()
    const port = container.getMappedPort(5432)
    process.env.DATABASE_URL = `postgres://postgres@${host}:${port}/${DATABASE_NAME}`
  }
}
