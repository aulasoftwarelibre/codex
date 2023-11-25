import { Provider } from '@auth/core/providers'
import {
  EmailUserConfig,
  SendVerificationRequestParams,
} from '@auth/core/providers/email'

export default function Email(
  options: EmailUserConfig & Record<string, unknown>,
): Provider {
  return {
    from: 'Auth.js <no-reply@authjs.dev>',
    id: 'email',
    maxAge: 24 * 60 * 60,
    name: 'Email',
    options,
    async sendVerificationRequest(parameters: SendVerificationRequestParams) {
      const response = await fetch(process.env.MAILER_URL as string, {
        body: JSON.stringify(parameters),
        headers: {
          Authorization: `Bearer ${process.env.MAILER_SECRET}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const { errors } = await response.json()
        throw new Error(JSON.stringify(errors))
      }
    },
    server: { auth: { pass: '', user: '' }, host: 'localhost', port: 25 },
    type: 'email',
  }
}
