import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { ObterPratosUseCase } from '@/domain/gerenciamento/application/use-cases/obter-pratos-use-case'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestObterPratoUseCase extends ObterPratosUseCase {
  constructor(pratoRepository: PratoRepository) {
    super(pratoRepository)
  }
}
