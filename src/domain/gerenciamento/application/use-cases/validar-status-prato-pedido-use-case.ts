import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'
import { PratoPedidoRepository } from '../repositories/prato-pedido-repository'
import { InvalidUuidError } from '@/core/errors/errors/invalid-uuid-error'
import { UUIDValidator } from '@/core/entities/validators/uuid'

export interface ValidarStatusPratoPedidoUseCaseRequest {
  idExterno: string
}

export type ValidarStatusPratoPedidoUseCaseResponse = Either<
  InvalidUuidError | ResourceNotFoundError,
  { pratoPedido: PratoPedido }
>

export class ValidarStatusPratoPedidoUseCase {
  constructor(private pratoPedidoRepository: PratoPedidoRepository) {}

  async execute({
    idExterno,
  }: ValidarStatusPratoPedidoUseCaseRequest): Promise<ValidarStatusPratoPedidoUseCaseResponse> {
    if (!new UUIDValidator(idExterno).validate()) {
      return left(new InvalidUuidError())
    }

    const pratoPedido =
      await this.pratoPedidoRepository.findByIdExterno(idExterno)

    if (!pratoPedido) {
      return left(new ResourceNotFoundError())
    }

    return right({ pratoPedido })
  }
}
