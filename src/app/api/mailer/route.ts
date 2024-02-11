import { SmtpClient } from '@/lib/mailer/smtp-client'

export async function POST(request: Request) {
  const authorization = request.headers.get('authorization')

  if (process.env.MAILER_SECRET === 'CHANGE_ME') {
    console.error('Change MAILER_SECRET default value!!!')

    return Response.json(
      { error: true, message: 'Access denied' },
      { status: 401 },
    )
  }

  if (authorization !== `Bearer ${process.env.MAILER_SECRET}`) {
    return Response.json(
      { error: true, message: 'Access denied' },
      { status: 401 },
    )
  }

  const parameters = await request.json()

  await new SmtpClient(
    process.env.MAILER_DSN as string,
  ).sendVerificationRequest(parameters)

  return Response.json({ success: true })
}
