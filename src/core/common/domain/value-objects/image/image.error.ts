import DomainError from '@/core/common/domain/errors/domain-error'

export default class ImageError extends DomainError {
  static causeInvalidUrl(): ImageError {
    return new ImageError('Invalid URL')
  }
}
