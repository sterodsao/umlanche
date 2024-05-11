import { faker } from '@faker-js/faker'

import {
  Notificacao,
  NotificacaoProps,
} from '@/domain/notificacao/enterprise/entities/notificacao'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaNotificacaoMapper } from '@/infra/database/prisma/mappers/prisma-notificacao-mapper'
import { EntityID } from '@/core/entities/entity-id'

export function makeNotificacao(
  override: Partial<NotificacaoProps> = {},
  id?: EntityID,
) {
  const notificacao = Notificacao.create(
    {
      identificadorId: new EntityID(),
      titulo: faker.lorem.sentence(4),
      conteudo: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notificacao
}

@Injectable()
export class NotificacaoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotificacao(
    data: Partial<NotificacaoProps> = {},
  ): Promise<Notificacao> {
    const notificacao = makeNotificacao(data)

    await this.prisma.notificacao.create({
      data: PrismaNotificacaoMapper.toPrisma(notificacao),
    })

    return notificacao
  }
}
