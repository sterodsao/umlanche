import { PaginationParams } from '@/core/repositories/pagination-params'
import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'

export class InMemoryPratoRepository implements PratoRepository {
  public items: Prato[] = []

  async findById(id: string): Promise<Prato | null> {
    const prato = this.items.find((item) => item.id.toString() === id)

    if (!prato) {
      return null
    }

    return prato
  }

  async findMany({ page }: PaginationParams): Promise<Prato[]> {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async save(prato: Prato): Promise<void> {
    this.items[this.items.findIndex((item) => item.id === prato.id)] = prato
  }

  async create(prato: Prato): Promise<void> {
    this.items.push(prato)
  }
}
