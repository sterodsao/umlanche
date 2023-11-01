import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { CriarPratoUseCase } from '@/domain/gerenciamento/application/use-cases/criar-prato-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCriarPratoUseCase extends CriarPratoUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
