import { EntityID } from '@/core/entities/entity-id'
import {
  PratoPedido,
  PratoPedidoProps,
} from '@/domain/gerenciamento/enterprise/entities/prato-pedido'
import { PrismaPratoPedidoMapper } from '@/infra/database/prisma/mappers/prisma-prato-pedido-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

export function makePratoPedidoFactory(
  override: Partial<PratoPedidoProps> = {},
  id?: EntityID,
) {
  return PratoPedido.create(
    {
      pratoId: new EntityID(1),
      idExterno: new EntityID(randomUUID()),
      ...override,
    },
    id,
  )
}

@Injectable()
export class PratoPedidoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPratoPedido(
    data: Partial<PratoPedidoProps> = {},
  ): Promise<PratoPedido> {
    const pratoPedido = makePratoPedidoFactory(data)

    await this.prisma.pedido.create({
      data: PrismaPratoPedidoMapper.toPrisma(pratoPedido),
    })

    return pratoPedido
  }
}
