import { Notificacao } from '../../enterprise/entities/notificacao'

export abstract class NotificacaoRepository {
  abstract findById(id: string): Promise<Notificacao | null>
  abstract create(notificacao: Notificacao): Promise<void>
  abstract save(notificacao: Notificacao): Promise<void>
}
