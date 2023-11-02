import { Either, left, right } from '@/core/either'
import { Prato } from '../../enterprise/entities/prato'
import { InvalidArgumentPrecoError } from './errors/invalid-argument-preco'
import { PratoRepository } from '../repositories/prato-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface AtualizarPratoUseCaseRequest {
  pratoId: string
  nome: string
  ingredientes: string
  preco: number
}

export type AtualizarPratoUseCaseResponse = Either<
  ResourceNotFoundError | InvalidArgumentPrecoError,
  { prato: Prato }
>

export class AtualizarPratoUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    pratoId,
    nome,
    ingredientes,
    preco,
  }: AtualizarPratoUseCaseRequest): Promise<AtualizarPratoUseCaseResponse> {
    if (preco < 0) return left(new InvalidArgumentPrecoError(preco.toString()))
    const prato = await this.pratoRepository.findById(pratoId)
    if (!prato) return left(new ResourceNotFoundError())
    prato.nome = nome
    prato.ingredientes = ingredientes
    prato.preco = preco
    await this.pratoRepository.save(prato)
    return right({ prato })
  }
}
