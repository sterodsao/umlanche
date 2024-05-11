import { Either, right } from '@/core/either'
import { Notificacao } from '../../enterprise/entities/notificacao'
import { Injectable } from '@nestjs/common'
import { NotificacaoRepository } from '../repositories/notificacao-repository'
import { EntityID } from '@/core/entities/entity-id'

export interface EnviarNotificacaoUseCaseRequest {
  identificadorId: string
  titulo: string
  conteudo: string
}

export type EnviarNotificacaoUseCaseResponse = Either<
  null,
  {
    notificacao: Notificacao
  }
>

@Injectable()
export class EnviarNotificacaoUseCase {
  constructor(private notificacaosRepository: NotificacaoRepository) {}

  async execute({
    identificadorId,
    titulo,
    conteudo,
  }: EnviarNotificacaoUseCaseRequest): Promise<EnviarNotificacaoUseCaseResponse> {
    const notificacao = Notificacao.create({
      identificadorId: new EntityID(identificadorId),
      titulo,
      conteudo,
    })

    await this.notificacaosRepository.create(notificacao)

    return right({
      notificacao,
    })
  }
}
