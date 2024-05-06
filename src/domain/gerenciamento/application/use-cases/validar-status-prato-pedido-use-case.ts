import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'
import { PratoPedidoRepository } from '../repositories/prato-pedido-repository'

export interface ValidarStatusPratoPedidoUseCaseRequest {
  idExterno: string
}

export type ValidarStatusPratoPedidoUseCaseResponse = Either<
  ResourceNotFoundError,
  { pratoPedido: PratoPedido }
>

export class ValidarStatusPratoPedidoUseCase {
  constructor(private pratoPedidoRepository: PratoPedidoRepository) {}

  async execute({
    idExterno,
  }: ValidarStatusPratoPedidoUseCaseRequest): Promise<ValidarStatusPratoPedidoUseCaseResponse> {
    const pratoPedido =
      await this.pratoPedidoRepository.findByIdExterno(idExterno)

    if (!pratoPedido) {
      return left(new ResourceNotFoundError())
    }

    return right({ pratoPedido })
  }
}
