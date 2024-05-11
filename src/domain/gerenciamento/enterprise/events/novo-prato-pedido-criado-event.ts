import { EntityID } from '@/core/entities/entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { PratoPedido } from '../entities/prato-pedido'

export class NovoPratoPedidoCriadoEvent implements DomainEvent {
  public ocurredAt: Date
  public pratoPedido: PratoPedido

  constructor(pratoPedido: PratoPedido) {
    this.ocurredAt = new Date()
    this.pratoPedido = pratoPedido
  }

  getAggregateId(): EntityID {
    return this.pratoPedido.idExterno
  }
}
