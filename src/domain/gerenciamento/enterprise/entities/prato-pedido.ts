import { Pedido, PedidoProps } from './pedido'
import { EntityID } from '@/core/entities/entity-id'
import { Optional } from '@/core/types/optional'

export interface PratoPedidoProps extends PedidoProps {
  pratoId: EntityID
  emailResponsavel: string
}

export class PratoPedido extends Pedido<PratoPedidoProps> {
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

  static create(
    props: Optional<PratoPedidoProps, 'solicitadoEm'>,
    id?: EntityID,
  ) {
    return new PratoPedido(
      { ...props, solicitadoEm: props.solicitadoEm ?? new Date() },
      id,
    )
  }
}
