import dotenv from 'dotenv'
import { defineConfig, devices } from 'next/experimental/testmode/playwright'

const PORT = process.env.PORT || 3000
const baseURL = `http://localhost:${PORT}`

dotenv.config({
  path: '.env.test',
})

export default defineConfig({
  fullyParallel: false,
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      dependencies: ['setup'],
      name: 'Desktop Chrome',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter: 'html',
  retries: 3,
  testDir: './e2e',
  use: {
    baseURL,
    trace: 'retry-with-trace',
  },
  webServer: {
    command: `yarn dev -p ${PORT}`,
    reuseExistingServer: !process.env.CI,
    url: baseURL,
  },
  workers: 1,
})
