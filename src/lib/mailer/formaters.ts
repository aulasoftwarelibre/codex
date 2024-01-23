import { Theme } from '@auth/core/types'

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html(parameters: { host: string; theme: Theme; url: string }) {
  const { url } = parameters

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            text-align: center;
        }

        .container {
            width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px 60px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: left;
        }

        h1 {
            color: #000;
            font-size: 24px;
            text-align: center;
        }

        p {
            line-height: 1.5;
            font-size: 16px;
        }

        .button-container {
            margin-top: 20px;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            text-align: center;
            text-decoration: none;
            background-color: #000;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
        }

        .button:hover {
            background-color: #333;
        }

        .note {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verifique su inicio de sesión en Codex</h1>
        <p>Hola,</p>
        <p>Hemos recibido un intento de inicio de sesión para este correo en nuestra plataforma</p>
        <p>Para completar el proceso de inicio de sesión, haga clic en el botón a continuación:</p>
        <div class="button-container">
            <a href="${url}" class="button">VERIFICAR</a>
        </div>
        <p>O copie y pegue esta URL en una nueva pestaña de su navegador:</p>
        <p><a href="${url}">${url}</a></p>
        <p class="note">Si no intentó iniciar sesión, pero recibió este correo electrónico, puede ignorarlo.</p>
    </div>
</body>
</html>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ host, url }: { host: string; url: string }) {
  return `Iniciar sesión en Codex [${host}]\n${url}\n\n`
}
