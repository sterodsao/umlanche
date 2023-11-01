import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'
import { Prato as PrismaPrato, Prisma } from '@prisma/client'

export class PrismaPratoMapper {
  static toDomain(raw: PrismaPrato): Prato {
    return Prato.create(
      {
        nome: raw.ds_nome,
        descricao: raw.ds_descricao,
        preco: raw.vl_preco.toNumber(),
        ativo: raw.fg_ativo,
        incluidoEm: raw.incluido_em,
        atualizadoEm: raw.atualizado_em,
      },
      new UniqueEntityID(raw.id_prato),
    )
  }

  static toPrisma(prato: Prato): Prisma.PratoUncheckedCreateInput {
    return {
      id_prato: prato.id.toString(),
      ds_nome: prato.nome,
      ds_descricao: prato.descricao,
      vl_preco: prato.preco,
      incluido_em: prato.incluidoEm,
      atualizado_em: prato.atualizadoEm,
    }
  }
}
