import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'
import { PratoRepository } from '../repositories/prato-repository'
import { PratoPedidoRepository } from '../repositories/prato-pedido-repository'
import { EntityID } from '@/core/entities/entity-id'
import { randomUUID } from 'crypto'

export interface CriarPratoPedidoUseCaseRequest {
  pratoId: number
}

export type CriarPratoPedidoUseCaseResponse = Either<
  ResourceNotFoundError,
  { pratoPedido: PratoPedido }
>

export class CriarPratoPedidoUseCase {
  constructor(
    private pratoRepository: PratoRepository,
    private pratoPedidoRepository: PratoPedidoRepository,
  ) {}

  async execute({
    pratoId,
  }: CriarPratoPedidoUseCaseRequest): Promise<CriarPratoPedidoUseCaseResponse> {
    const prato = await this.pratoRepository.findById(pratoId)

    if (!prato) {
      return left(new ResourceNotFoundError())
    }

    const pratoPedido = PratoPedido.create({
      pratoId: new EntityID(pratoId),
      idExterno: new EntityID(randomUUID()),
    })

    await this.pratoPedidoRepository.create(pratoPedido)

    return right({ pratoPedido })
  }
}
