import DomainError from '@/core/common/domain/errors/domain-error'

export default class EmailError extends DomainError {
  static causeInvalidEmail(): EmailError {
    return new EmailError('Invalid email format')
  }
}
