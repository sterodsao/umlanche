import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'
import { PratoRepository } from '../repositories/prato-repository'
import { PratoPedidoRepository } from '../repositories/prato-pedido-repository'
import { EntityID } from '@/core/entities/entity-id'
import { randomUUID } from 'crypto'
import { HashGenerator } from '@/core/cryptography/hash-generator'

export interface CriarPratoPedidoUseCaseRequest {
  pratoId: number
  emailResponsavel: string
}

export type CriarPratoPedidoUseCaseResponse = Either<
  ResourceNotFoundError,
  { pratoPedido: PratoPedido }
>

export class CriarPratoPedidoUseCase {
  constructor(
    private pratoRepository: PratoRepository,
    private pratoPedidoRepository: PratoPedidoRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    pratoId,
    emailResponsavel,
  }: CriarPratoPedidoUseCaseRequest): Promise<CriarPratoPedidoUseCaseResponse> {
    const prato = await this.pratoRepository.findById(pratoId)

    if (!prato) {
      return left(new ResourceNotFoundError())
    }

    const hashedEmailResponsavel = await this.hashGenerator.hash(
      emailResponsavel,
      4,
    )

    const pratoPedido = PratoPedido.create({
      pratoId: new EntityID(pratoId),
      idExterno: new EntityID(randomUUID()),
      emailResponsavel: hashedEmailResponsavel,
    })

    await this.pratoPedidoRepository.create(pratoPedido)

    return right({ pratoPedido })
  }
}
