import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'
import { Prato as PrismaPrato, Prisma } from '@prisma/client'

export class PrismaPratoMapper {
  static toDomain(raw: PrismaPrato): Prato {
    return Prato.create(
      {
        nome: raw.ds_nome,
        ingredientes: raw.ds_ingredientes,
        preco: (raw.vl_preco /= 100),
        ativo: raw.fg_ativo,
        incluidoEm: raw.incluido_em,
        atualizadoEm: raw.alterado_em,
      },
      new UniqueEntityID(raw.id_prato),
    )
  }

  static toPrisma(prato: Prato): Prisma.PratoUncheckedCreateInput {
    return {
      id_prato: prato.id.toString(),
      ds_nome: prato.nome,
      ds_ingredientes: prato.ingredientes,
      vl_preco: (prato.preco *= 100),
      fg_ativo: prato.ativo,
      incluido_em: prato.incluidoEm,
      alterado_em: prato.atualizadoEm,
    }
  }
}
