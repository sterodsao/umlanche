import { PratoPedidoRepository } from '@/domain/gerenciamento/application/repositories/prato-pedido-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PratoPedido } from '@/domain/gerenciamento/enterprise/entities/prato-pedido'
import { PrismaPratoPedidoMapper } from '../mappers/prisma-prato-pedido-mapper'

@Injectable()
export class PrismaPratoPedidoRepository implements PratoPedidoRepository {
  constructor(private prisma: PrismaService) {}

  async findByIdExterno(id: string): Promise<PratoPedido | null> {
    const pratoPedido = await this.prisma.pedido.findFirst({
      where: {
        id_externo: id,
      },
    })

    if (!pratoPedido) {
      return null
    }

    return PrismaPratoPedidoMapper.toDomain(pratoPedido)
  }

  async create(pratoPedido: PratoPedido): Promise<void> {
    const data = PrismaPratoPedidoMapper.toPrisma(pratoPedido)

    await this.prisma.pedido.create({ data })
  }
}
