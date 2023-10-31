import { Either, left, right } from '@/core/either'
import { Prato } from '../../enterprise/entities/prato'
import { InvalidArgumentPrecoError } from './errors/invalid-argument-preco'
import { PratoRepository } from '../repositories/prato-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface EditarPratoUseCaseRequest {
  pratoId: string
  nome: string
  descricao: string
  preco: number
}

export type EditarPratoUseCaseResponse = Either<
  ResourceNotFoundError | InvalidArgumentPrecoError,
  { prato: Prato }
>

export class EditarPratoUseCase {
  constructor(private pratoRepository: PratoRepository) {}

  async execute({
    pratoId,
    nome,
    descricao,
    preco,
  }: EditarPratoUseCaseRequest): Promise<EditarPratoUseCaseResponse> {
    if (preco < 0) return left(new InvalidArgumentPrecoError(preco.toString()))
    const prato = await this.pratoRepository.findById(pratoId)
    if (!prato) return left(new ResourceNotFoundError())
    prato.nome = nome
    prato.descricao = descricao
    prato.preco = preco
    await this.pratoRepository.save(prato)
    return right({ prato })
  }
}
