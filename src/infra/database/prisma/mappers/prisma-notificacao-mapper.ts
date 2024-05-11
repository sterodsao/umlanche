import { EntityID } from '@/core/entities/entity-id'
import { Notificacao } from '@/domain/notificacao/enterprise/entities/notificacao'
import { Notificacao as PrismaNotificacao, Prisma } from '@prisma/client'

export class PrismaNotificacaoMapper {
  static toDomain(raw: PrismaNotificacao): Notificacao {
    return Notificacao.create(
      {
        titulo: raw.titulo,
        conteudo: raw.conteudo,
        identificadorId: new EntityID(raw.id_externo),
      },
      new EntityID(raw.id),
    )
  }

  static toPrisma(
    notificacao: Notificacao,
  ): Prisma.NotificacaoUncheckedCreateInput {
    return {
      id: notificacao.id.toString(),
      id_externo: notificacao.identificadorId.toString(),
      titulo: notificacao.titulo,
      conteudo: notificacao.conteudo,
    }
  }
}
