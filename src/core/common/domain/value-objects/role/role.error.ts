import DomainError from '@/core/common/domain/errors/domain-error'

export default class RoleError extends DomainError {
  static causeInvalidRole(): RoleError {
    return new RoleError('Role must start with ROLE_')
  }
}
