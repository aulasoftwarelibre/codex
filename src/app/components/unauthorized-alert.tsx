import { Card, CardBody, CardHeader } from '@nextui-org/react'

import { UserResponse } from '@/core/user/dto/responses/user.response'

interface UnauthorizedAlertProperties {
  user?: UserResponse
}

export function UnauthorizedAlert(properties: UnauthorizedAlertProperties) {
  const { user } = properties

  if (
    !user ||
    user.roles.some((role) => ['ROLE_MEMBER', 'ROLE_ADMIN'].includes(role))
  ) {
    return null
  }

  return (
    <>
      <Card className="container mx-auto px-4 py-2 bg-default-200">
        <CardHeader className="font-bold">
          Reserva de libros no disponible para este usuario.
        </CardHeader>
        <CardBody>
          Tu usuario no está autorizado para reservar libros. Contacta con el
          equipo de coordinación del Aula de Software Libre para autorizar tu
          cuenta.
        </CardBody>
      </Card>
    </>
  )
}
