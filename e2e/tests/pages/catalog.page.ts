import { Page } from '@playwright/test'

export class CatalogPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async loan(title: string) {
    await this.page
      .getByRole('gridcell', { name: title })
      .getByLabel('Loan book')
      .click()
    await this.page
      .getByText('Libro marcado como prestado.')
      .waitFor({ state: 'visible' })
  }

  async return(title: string) {
    await this.page
      .getByRole('gridcell', { name: title })
      .getByLabel('Return book')
      .click()
    await this.page
      .getByText('Libro marcado como devuelto.')
      .waitFor({ state: 'visible' })
  }
}
