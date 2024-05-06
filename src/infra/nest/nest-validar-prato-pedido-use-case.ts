import { PratoPedidoRepository } from '@/domain/gerenciamento/application/repositories/prato-pedido-repository'
import { ValidarStatusPratoPedidoUseCase } from '@/domain/gerenciamento/application/use-cases/validar-status-prato-pedido-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestValidarPratoPedidoUseCase extends ValidarStatusPratoPedidoUseCase {
  constructor(pratoPedidoRepository: PratoPedidoRepository) {
    super(pratoPedidoRepository)
  }
}
