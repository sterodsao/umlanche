import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { AtivarPratoUseCase } from '@/domain/gerenciamento/application/use-cases/ativar-prato-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAtivarPratoUseCase extends AtivarPratoUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
