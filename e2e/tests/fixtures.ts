import { test as base } from '@playwright/test'

import BookPage from './pages/book.page'
import CatalogPage from './pages/catalog.page'
import SettingsPage from './pages/settings.page'

export * from '@playwright/test'

type Fixtures = {
  bookPage: BookPage
  catalogPage: CatalogPage
  settingsPage: SettingsPage
}

export const test = base.extend<Fixtures>({
  bookPage: async ({ page, request }, use, testInfo) => {
    const bookPage = new BookPage(page, testInfo)
    await request.post('http://localhost:3000/api/revalidate')

    await use(bookPage)

    await bookPage.removeAll()
  },
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page)

    await use(catalogPage)
  },
  settingsPage: async ({ page, request }, use) => {
    const settingsPage = new SettingsPage(page)
    await settingsPage.restore()
    await request.post('http://localhost:3000/api/revalidate')

    await use(settingsPage)

    await settingsPage.restore()
  },
})
