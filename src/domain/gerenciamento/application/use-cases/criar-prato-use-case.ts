import { Either, left, right } from '@/core/either'
import { PratoRepository } from '../repositories/prato-repository'
import { Prato } from '../../enterprise/entities/prato'
import { InvalidArgumentPrecoError } from './errors/invalid-argument-preco'

export interface CriarPratoUseCaseRequest {
  nome: string
  ingredientes: string
  preco: number
}

export type CriarPratoUseCaseResponse = Either<
  InvalidArgumentPrecoError,
  { prato: Prato }
>

export class CriarPratoUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    nome,
    ingredientes,
    preco,
  }: CriarPratoUseCaseRequest): Promise<CriarPratoUseCaseResponse> {
    if (preco < 0) return left(new InvalidArgumentPrecoError(preco.toString()))
    const prato = Prato.create({ nome, ingredientes, preco })
    await this.pratoRepository.create(prato)
    return right({ prato })
  }
}
