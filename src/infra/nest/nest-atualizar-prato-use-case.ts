import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { AtualizarPratoUseCase } from '@/domain/gerenciamento/application/use-cases/atualizar-prato-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAtualizarPratoUseCase extends AtualizarPratoUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
