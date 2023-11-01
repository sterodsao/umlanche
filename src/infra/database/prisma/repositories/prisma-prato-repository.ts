import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { PrismaService } from '../prisma.service'
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'
import { Injectable } from '@nestjs/common'
import { PrismaPratoMapper } from '../mappers/prisma-prato-mapper'

@Injectable()
export class PrismaPratoRepository implements PratoRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Prato | null> {
    const prato = await this.prisma.prato.findUnique({
      where: {
        id_prato: id,
      },
    })

    if (!prato) {
      return null
    }

    return PrismaPratoMapper.toDomain(prato)
  }

  async findMany({ page }: PaginationParams): Promise<Prato[]> {
    const pratos = await this.prisma.prato.findMany({
      orderBy: {
        incluido_em: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pratos.map(PrismaPratoMapper.toDomain)
  }

  async create(prato: Prato): Promise<void> {
    const data = PrismaPratoMapper.toPrisma(prato)

    await this.prisma.prato.create({
      data,
    })
  }

  async save(prato: Prato): Promise<void> {
    const data = PrismaPratoMapper.toPrisma(prato)

    await Promise.all([
      this.prisma.prato.update({
        where: {
          id_prato: prato.id.toString(),
        },
        data,
      }),
    ])

    DomainEvents.dispatchEventsForAggregate(prato.id)
  }
}
