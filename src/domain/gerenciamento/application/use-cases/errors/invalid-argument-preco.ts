import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidArgumentPrecoError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(identifier)
  }
}
