import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      cleanOnRerun: true,
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['tests/setup.ts'],
    globalSetup: 'tests/global-setup.ts',
    pool: 'forks',
  },
})
