import { Entity } from '@/core/entities/entity'
import { EntityID } from '@/core/entities/entity-id'

export interface NotificacaoProps {
  identificadorId: EntityID
  titulo: string
  conteudo: string
}

export class Notificacao extends Entity<NotificacaoProps> {
  get identificadorId() {
    return this.props.identificadorId
  }

  get titulo() {
    return this.props.titulo
  }

  get conteudo() {
    return this.props.conteudo
  }

  static create(props: NotificacaoProps, id?: EntityID) {
    return new Notificacao(props, id)
  }
}
