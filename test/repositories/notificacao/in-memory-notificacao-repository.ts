import { NotificacaoRepository } from '@/domain/notificacao/application/repositories/notificacao-repository'
import { Notificacao } from '@/domain/notificacao/enterprise/entities/notificacao'

export class InMemoryNotificacaoRepository implements NotificacaoRepository {
  public items: Notificacao[] = []

  async findById(id: string): Promise<Notificacao | null> {
    const notificacao = this.items.find((item) => item.id.toString() === id)

    if (!notificacao) {
      return null
    }

    return notificacao
  }

  async save(notificacao: Notificacao): Promise<void> {
    this.items[this.items.findIndex((item) => item.id === notificacao.id)] =
      notificacao
  }

  async create(notificacao: Notificacao): Promise<void> {
    this.items.push(notificacao)
  }
}
