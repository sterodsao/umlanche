import { PedidoProps } from './pedido'
import { EntityID } from '@/core/entities/entity-id'
import { Optional } from '@/core/types/optional'
import { NovoPratoPedidoCriadoEvent } from '../events/novo-prato-pedido-criado-event'
import { AggregateRoot } from '@/core/entities/aggregate-root'

export interface PratoPedidoProps extends PedidoProps {
  pratoId: EntityID
  emailResponsavel: string
}

export class PratoPedido extends AggregateRoot<PratoPedidoProps> {
  get pratoId() {
    return this.props.pratoId
  }

  get idExterno() {
    return this.props.idExterno
  }

  get statusPratoPedidoConcluido() {
    return !!this.props.retiradoEm
  }

  get emailResponsavel() {
    return this.props.emailResponsavel
  }

  get solicitadoEm() {
    return this.props.solicitadoEm
  }

  get retiradoEm() {
    return this.props.retiradoEm
  }

  static create(
    props: Optional<PratoPedidoProps, 'solicitadoEm'>,
    id?: EntityID,
  ) {
    const pratoPedido = new PratoPedido(
      { ...props, solicitadoEm: props.solicitadoEm ?? new Date() },
      id,
    )

    if (!id) {
      pratoPedido.addDomainEvent(new NovoPratoPedidoCriadoEvent(pratoPedido))
    }

    return pratoPedido
  }
}
