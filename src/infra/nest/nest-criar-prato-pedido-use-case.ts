import { PratoPedidoRepository } from '@/domain/gerenciamento/application/repositories/prato-pedido-repository'
import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { CriarPratoPedidoUseCase } from '@/domain/gerenciamento/application/use-cases/criar-prato-pedido-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCriarPratoPedidoUseCase extends CriarPratoPedidoUseCase {
  constructor(
    pratoRepository: PratoRepository,
    pratoPedidoRepository: PratoPedidoRepository,
  ) {
    super(pratoRepository, pratoPedidoRepository)
  }
}
