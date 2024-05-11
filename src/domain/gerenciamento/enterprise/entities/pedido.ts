import { Entity } from '@/core/entities/entity'
import { EntityID } from '@/core/entities/entity-id'

export interface PedidoProps {
  idExterno: EntityID
  solicitadoEm: Date
  retiradoEm?: Date | null
}

export abstract class Pedido<Props extends PedidoProps> extends Entity<Props> {}
