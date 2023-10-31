import { PaginationParams } from '@/core/repositories/pagination-params'
import { Prato } from '../../enterprise/entities/prato'

export interface PratoRepository {
  findById(id: string): Promise<Prato | null>
  findMany(params: PaginationParams): Promise<Prato[]>
  save(prato: Prato): Promise<void>
  create(prato: Prato): Promise<void>
}
