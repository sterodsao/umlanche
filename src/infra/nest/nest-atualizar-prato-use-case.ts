import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { EditarPratoUseCase } from '@/domain/gerenciamento/application/use-cases/atualizar-prato-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAtualizarPratoUseCase extends EditarPratoUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
