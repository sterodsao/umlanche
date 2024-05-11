import { EventHandler } from '@/core/events/event-handler'
import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { EnviarNotificacaoUseCase } from '../use-cases/enviar-notificacao-use-case'
import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { NovoPratoPedidoCriadoEvent } from '@/domain/gerenciamento/enterprise/events/novo-prato-pedido-criado-event'

@Injectable()
export class OnNovoPedidoCriado implements EventHandler {
  constructor(
    private pratoRepository: PratoRepository,
    private enviarNotificacaoUseCase: EnviarNotificacaoUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.enviarNovoPratoPedidoNotificacao.bind(this),
      NovoPratoPedidoCriadoEvent.name,
    )
  }

  private async enviarNovoPratoPedidoNotificacao({
    pratoPedido,
  }: NovoPratoPedidoCriadoEvent) {
    const prato = await this.pratoRepository.findById(
      pratoPedido.pratoId.toValue(),
    )

    if (prato) {
      await this.enviarNotificacaoUseCase.execute({
        identificadorId: pratoPedido.idExterno.toString(),
        titulo: `Novo pedido para o prato ${prato.nome}`,
        conteudo: '',
      })
    }
  }
}
