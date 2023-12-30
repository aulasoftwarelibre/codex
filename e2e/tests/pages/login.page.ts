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
    await webMailPage.getByText('aulasoftwarelibre@uco.es').first().click()

    // Open login link
    await webMailPage
      .frameLocator('#preview-html')
      .getByRole('link', { name: 'Sign in' })
      .click()

    return await webMailPage.waitForEvent('popup')
  }
}

export default LoginPage
