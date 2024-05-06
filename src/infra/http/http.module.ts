import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CriarPratoController } from './controllers/criar-prato.controller'
import { NestCriarPratoUseCase } from '../nest/nest-criar-prato-use-case'
import { ObterPratosController } from './controllers/obter-pratos.controller'
import { NestObterPratoUseCase } from '../nest/nest-obter-prato-use-case'
import { InativarPratoController } from './controllers/inativar-prato.controller'
import { NestInativarPratoUseCase } from '../nest/nest-inativar-prato-use-case'
import { NestAtivarPratoUseCase } from '../nest/nest-ativar-prato-use-case'
import { AtivarPratoController } from './controllers/ativar-prato.controller'
import { AtualizarPratoController } from './controllers/atualizar-prato.controller'
import { NestAtualizarPratoUseCase } from '../nest/nest-atualizar-prato-use-case'
import { NestCriarPratoPedidoUseCase } from '../nest/nest-criar-prato-pedido-use-case'
import { CriarPratoPedidoController } from './controllers/criar-prato-pedido.controller'
import { ValidarStatusPratoPedidoController } from './controllers/validar-status-prato-pedido.controller'
import { NestValidarPratoPedidoUseCase } from '../nest/nest-validar-prato-pedido-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CriarPratoController,
    ObterPratosController,
    InativarPratoController,
    AtivarPratoController,
    AtualizarPratoController,
    CriarPratoPedidoController,
    ValidarStatusPratoPedidoController,
  ],
  providers: [
    NestCriarPratoUseCase,
    NestObterPratoUseCase,
    NestInativarPratoUseCase,
    NestAtivarPratoUseCase,
    NestAtualizarPratoUseCase,
    NestCriarPratoPedidoUseCase,
    NestValidarPratoPedidoUseCase,
  ],
})
export class HttpModule {}
