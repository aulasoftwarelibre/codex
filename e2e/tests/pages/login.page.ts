import { Page } from '@playwright/test'

class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/signin')
  }

  async login(email: string) {
    // Insert email
    await this.page.getByPlaceholder('Introduce tu email').fill(email)
    await this.page
      .getByRole('button', { name: 'Continuar con el email' })
      .click()

    // Open WebMail
    await this.page.getByRole('button', { name: 'Abrir UCOWebMail' }).click()
    const webMailPage = await this.page.waitForEvent('popup')
    await webMailPage
      .getByRole('cell', { name: '<aulasoftwarelibre@uco.es>' })
      .first()
      .click()

    // Open login link
    await webMailPage.getByRole('link', { name: 'VERIFICAR' }).click()

    return webMailPage
  }
}

export default LoginPage
