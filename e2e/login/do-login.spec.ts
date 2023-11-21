import { expect, test } from 'next/experimental/testmode/playwright'

test.describe('Do login with email', () => {
  test.afterEach(async ({ request }) => {
    await request.delete('http://localhost:8025/api/v1/messages')
  })

  test('open login page', async ({ page }) => {
    // Arrange
    await page.goto('/')

    // Act
    await page.getByRole('button', { name: 'avatar' }).click()
    await page.getByText('Iniciar sesión').click()

    // Assert
    await expect(page).toHaveURL('/signin')
    await expect(page.locator('body')).toHaveText(/Iniciar sesión en/)
  })

  test('receive email login link', async ({ page, request }) => {
    // Arrange
    await page.goto('/signin')
    const email = `noreply+${+new Date()}@uco.es`

    // Act
    await page.getByPlaceholder('Introduce tu email').fill(email)
    await page.getByRole('button', { name: 'Continuar con el email' }).click()

    // Assert
    await expect(page).toHaveURL('/verify')
    await expect(page.locator('body')).toHaveText(/Verifica tu correo/)

    const response = await request.get('http://localhost:8025/api/v1/messages')
    expect(response.ok()).toBeTruthy()
    expect(await response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Raw: expect.objectContaining({ To: [email] }),
        }),
      ]),
    )
  })
})
