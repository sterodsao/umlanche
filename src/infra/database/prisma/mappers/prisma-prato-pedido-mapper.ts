import { EntityID } from '@/core/entities/entity-id'
import { PratoPedido } from '@/domain/gerenciamento/enterprise/entities/prato-pedido'
import { Pedido, Prisma } from '@prisma/client'

export class PrismaPratoPedidoMapper {
  static toDomain(raw: Pedido): PratoPedido {
    return PratoPedido.create(
      {
        pratoId: new EntityID(raw.id_prato),
        idExterno: new EntityID(raw.id_externo),
        emailResponsavel: raw.ds_email_responsavel,
        retiradoEm: raw.retirado_em,
        solicitadoEm: raw.solicitado_em,
      },
      new EntityID(raw.id_pedido),
    )
  }

  static toPrisma(pratoPedido: PratoPedido): Prisma.PedidoUncheckedCreateInput {
    return {
      id_prato: pratoPedido.pratoId.toValue(),
      id_externo: pratoPedido.idExterno.toString(),
      ds_email_responsavel: pratoPedido.emailResponsavel,
      solicitado_em: pratoPedido.solicitadoEm,
      retirado_em: pratoPedido.retiradoEm,
    }
  }
}
