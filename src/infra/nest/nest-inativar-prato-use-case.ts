import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { InativarPratoUseCase } from '@/domain/gerenciamento/application/use-cases/inativar-prato-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestInativarPratoUseCase extends InativarPratoUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
