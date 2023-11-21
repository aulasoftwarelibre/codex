import { defineConfig, devices } from 'next/experimental/testmode/playwright'
import path from 'path'

const PORT = process.env.PORT || 3000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter: 'html',
  testDir: path.join(__dirname, 'e2e'),
  use: {
    baseURL,
    trace: 'retry-with-trace',
  },
  webServer: {
    command: 'yarn dev --experimental-test-proxy',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
  },
})
