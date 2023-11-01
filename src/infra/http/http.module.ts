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

@Module({
  imports: [DatabaseModule],
  controllers: [
    CriarPratoController,
    ObterPratosController,
    InativarPratoController,
    AtivarPratoController,
  ],
  providers: [
    NestCriarPratoUseCase,
    NestObterPratoUseCase,
    NestInativarPratoUseCase,
    NestAtivarPratoUseCase,
  ],
})
export class HttpModule {}
