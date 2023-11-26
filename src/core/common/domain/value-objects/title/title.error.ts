import DomainError from '@/core/common/domain/errors/domain-error'

export default class TitleError extends DomainError {
  static causeTooShort(): TitleError {
    return new TitleError('El título es demasiado corto')
  }
}
