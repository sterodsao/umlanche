import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaNotificacaoMapper } from '../mappers/prisma-notificacao-mapper'
import { NotificacaoRepository } from '@/domain/notificacao/application/repositories/notificacao-repository'
import { Notificacao } from '@/domain/notificacao/enterprise/entities/notificacao'

@Injectable()
export class PrismaNotificacaoRepository implements NotificacaoRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notificacao | null> {
    const notificacao = await this.prisma.notificacao.findFirst({
      where: {
        id_externo: id,
      },
    })

    if (!notificacao) {
      return null
    }

    return PrismaNotificacaoMapper.toDomain(notificacao)
  }

  async create(notificacao: Notificacao): Promise<void> {
    const data = PrismaNotificacaoMapper.toPrisma(notificacao)

    await this.prisma.notificacao.create({
      data,
    })
  }

  async save(notificacao: Notificacao): Promise<void> {
    const data = PrismaNotificacaoMapper.toPrisma(notificacao)

    await Promise.all([
      this.prisma.notificacao.update({
        where: {
          id: notificacao.id.toString(),
        },
        data,
      }),
    ])
  }
}
