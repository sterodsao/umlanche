import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PratoProps,
  Prato,
} from '@/domain/gerenciamento/enterprise/entities/prato'
import { faker } from '@faker-js/faker'

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
