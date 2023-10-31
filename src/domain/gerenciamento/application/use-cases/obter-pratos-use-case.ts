import { Either, right } from '@/core/either'
import { PratoRepository } from '../repositories/prato-repository'
import { Prato } from '../../enterprise/entities/prato'

export interface ObterPratosUseCaseRequest {
  page: number
}

export type ObterPratosUseCaseResponse = Either<null, { pratos: Prato[] }>

export class ObterPratosUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    page,
  }: ObterPratosUseCaseRequest): Promise<ObterPratosUseCaseResponse> {
    const pratos = await this.pratoRepository.findMany({ page })
    return right({ pratos })
  }
}
