import { Page } from '@playwright/test'

import gravatar from '@/lib/utils/gravatar'

import prisma from '../helpers/prisma'

class SettingsPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/settings/profile')
  }

  async editName(name: string) {
    await this.page.getByPlaceholder('Nombre').fill(name)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Enviar' }).click()
  }

  async restore() {
    await prisma.user.upsert({
      create: {
        email: 'noreply@uco.es',
        image: gravatar('noreply@uco.es'),
        name: 'Jenny Doe',
        roles: ['ROLE_USER'],
      },
      update: { name: 'Jenny Doe' },
      where: { email: 'noreply@uco.es' },
    })
  }
}

export default SettingsPage
