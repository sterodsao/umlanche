import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PratoProps,
  Prato,
} from '@/domain/gerenciamento/enterprise/entities/prato'
import { PrismaPratoMapper } from '@/infra/database/prisma/mappers/prisma-prato-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makePratoFactory(
  override: Partial<PratoProps> = {},
  id?: UniqueEntityID,
) {
  return Prato.create(
    {
      nome: faker.lorem.sentence(2),
      descricao: faker.lorem.sentence(5),
      preco: faker.number.float(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class PratoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPrato(data: Partial<PratoProps> = {}): Promise<Prato> {
    const prato = makePratoFactory(data)

    await this.prisma.prato.create({
      data: PrismaPratoMapper.toPrisma(prato),
    })

    return prato
  }
}
