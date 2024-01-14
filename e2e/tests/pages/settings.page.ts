import { Page } from '@playwright/test'

import gravatar from '@/lib/utils/gravatar'

import prisma from '../helpers/prisma'

class SettingsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/settings/profile')
  }

  async edit(label: string, name: string) {
    await this.page.getByLabel(label).fill(name)
  }

  async submit(label: string) {
    await this.page
      .getByRole('region')
      .filter({ has: this.page.getByLabel(label) })
      .getByRole('button', { name: 'Guardar' })
      .click()
  }

  async restore() {
    await prisma.user.upsert({
      create: {
        email: 'noreply@uco.es',
        image: gravatar('noreply@uco.es'),
        name: 'Jenny Doe',
        roles: ['ROLE_USER', 'ROLE_MEMBER'],
      },
      update: { name: 'Jenny Doe' },
      where: { email: 'noreply@uco.es' },
    })

    await prisma.user.upsert({
      create: {
        email: 'admin@uco.es',
        image: gravatar('admin@uco.es'),
        name: 'Admin Doe',
        roles: ['ROLE_USER', 'ROLE_ADMIN'],
      },
      update: {},
      where: { email: 'admin@uco.es' },
    })
  }
}

export default SettingsPage
