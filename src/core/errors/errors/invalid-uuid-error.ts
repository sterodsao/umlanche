import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidUuidError extends Error implements UseCaseError {
  constructor() {
    super('invalid.uuid')
  }
}
