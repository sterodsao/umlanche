import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { EnviarNotificacaoUseCase } from '@/domain/notificacao/application/use-cases/enviar-notificacao-use-case'
import { OnNovoPedidoCriado } from '@/domain/notificacao/application/subscribers/on-novo-pedido-criado'

@Module({
  imports: [DatabaseModule],
  providers: [OnNovoPedidoCriado, EnviarNotificacaoUseCase],
})
export class EventsModule {}
