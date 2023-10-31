import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoRepository } from '../repositories/prato-repository'

export interface InativarPratoUseCaseRequest {
  pratoId: string
}

export type InativarPratoUseCaseResponse = Either<ResourceNotFoundError, null>

export class InativarPratoUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    pratoId,
  }: InativarPratoUseCaseRequest): Promise<InativarPratoUseCaseResponse> {
    const prato = await this.pratoRepository.findById(pratoId)

    if (!prato) return left(new ResourceNotFoundError())

    prato.ativo = false

    await this.pratoRepository.save(prato)

    return right(null)
  }
}
