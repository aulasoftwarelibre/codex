export default class Role {
  constructor(public readonly value: string) {}

  static create(role: string): Role {
    if (!role.startsWith('ROLE_')) {
      throw new Error('Role must start with ROLE_')
    }

    return new Role(role)
  }
}
