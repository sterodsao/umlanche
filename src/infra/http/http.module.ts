import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CriarPratoController } from './controllers/criar-prato.controller'
import { NestCriarPratoUseCase } from '../nest/nest-criar-prato-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CriarPratoController],
  providers: [NestCriarPratoUseCase],
})
export class HttpModule {}
