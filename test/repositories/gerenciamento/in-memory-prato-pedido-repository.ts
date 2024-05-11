import { DomainEvents } from '@/core/events/domain-events'
import { PratoPedidoRepository } from '@/domain/gerenciamento/application/repositories/prato-pedido-repository'
import { PratoPedido } from '@/domain/gerenciamento/enterprise/entities/prato-pedido'

export class InMemoryPratoPedidoRepository implements PratoPedidoRepository {
  public items: PratoPedido[] = []

  async findByIdExterno(id: string): Promise<PratoPedido | null> {
    const pratoPedido = this.items.find(
      (item) => item.idExterno.toString() === id,
    )

    if (!pratoPedido) {
      return null
    }

    return pratoPedido
  }

  async create(pratoPedido: PratoPedido): Promise<void> {
    this.items.push(pratoPedido)

    DomainEvents.dispatchEventsForAggregate(pratoPedido.id)
  }
}
