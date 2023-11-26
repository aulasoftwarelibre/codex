import DomainError from '@/core/common/domain/errors/domain-error'

export default class FullNameError extends DomainError {
  static causeNameTooShort(): FullNameError {
    return new FullNameError('El nombre del autor es demasiado corto')
  }
}
