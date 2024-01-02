type EnableUserRequest = {
  email: string
  enable: boolean
}

const EnableUserRequest = {
  with: (properties: EnableUserRequest) => properties,
}

export default EnableUserRequest
