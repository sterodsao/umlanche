import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoRepository } from '../repositories/prato-repository'

export interface AtivarPratoUseCaseRequest {
  pratoId: number
}

export type AtivarPratoUseCaseResponse = Either<ResourceNotFoundError, null>

export class AtivarPratoUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    pratoId,
  }: AtivarPratoUseCaseRequest): Promise<AtivarPratoUseCaseResponse> {
    const prato = await this.pratoRepository.findById(pratoId)

    if (!prato) return left(new ResourceNotFoundError())

    prato.ativo = true

    await this.pratoRepository.save(prato)

    return right(null)
  }
}
