import { PaginationParams } from '@/core/repositories/pagination-params'
import { Prato } from '../../enterprise/entities/prato'

export abstract class PratoRepository {
  abstract findById(id: number): Promise<Prato | null>
  abstract findMany(params: PaginationParams): Promise<Prato[]>
  abstract save(prato: Prato): Promise<void>
  abstract create(prato: Prato): Promise<void>
}
