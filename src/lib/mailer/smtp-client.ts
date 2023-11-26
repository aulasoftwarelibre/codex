import { SendVerificationRequestParams } from '@auth/core/providers/email'
import * as nodemailer from 'nodemailer'

import { html, text } from '@/lib/mailer/formaters'

export class SmtpClient {
  private transporter: nodemailer.Transporter

  constructor(dsn: string) {
    this.transporter = nodemailer.createTransport(dsn)
  }

  async sendVerificationRequest({
    identifier,
    provider,
    theme,
    url,
  }: SendVerificationRequestParams) {
    const { host } = new URL(url)

    console.debug('sendVerificationRequest', identifier, provider, theme, url)

    if (!identifier.toLowerCase().endsWith('@uco.es')) {
      throw new Error('La dirección de correo electrónico no es válida.')
    }

    try {
      await this.transporter.sendMail({
        from: provider.from,
        html: html({ host, theme, url }),
        subject: `Sign in to ${host}`,
        text: text({ host, url }),
        to: identifier,
      })
    } catch (error) {
      if ((error as Error).message) {
        console.error((error as Error).toString())
      }

      throw error
    }
  }
}
