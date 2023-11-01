import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CriarPratoController } from './controllers/criar-prato.controller'
import { NestCriarPratoUseCase } from '../nest/nest-criar-prato-use-case'
import { ObterPratosController } from './controllers/obter-pratos.controller'
import { NestObterPratoUseCase } from '../nest/nest-obter-prato-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CriarPratoController, ObterPratosController],
  providers: [NestCriarPratoUseCase, NestObterPratoUseCase],
})
export class HttpModule {}
