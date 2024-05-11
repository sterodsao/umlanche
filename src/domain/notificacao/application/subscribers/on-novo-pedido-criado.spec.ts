import { OnNovoPedidoCriado } from './on-novo-pedido-criado'
import { InMemoryPratoPedidoRepository } from 'test/repositories/gerenciamento/in-memory-prato-pedido-repository'
import { makePratoPedidoFactory } from 'test/factories/gerenciamento/make-prato-pedido-factory'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import {
  EnviarNotificacaoUseCase,
  EnviarNotificacaoUseCaseRequest,
  EnviarNotificacaoUseCaseResponse,
} from '../use-cases/enviar-notificacao-use-case'
import { MockInstance } from 'vitest'
import { InMemoryNotificacaoRepository } from 'test/repositories/notificacao/in-memory-notificacao-repository'
import { waitFor } from 'test/utils/wait-for'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { EntityID } from '@/core/entities/entity-id'

let inMemoryPratoRepository: InMemoryPratoRepository
let inMemoryNotificacaoRepository: InMemoryNotificacaoRepository
let enviarNotificacaoUseCase: EnviarNotificacaoUseCase
let inMemoryPratoPedidoRepository: InMemoryPratoPedidoRepository

let enviarNotificacaoExecuteSpy: MockInstance<
  [EnviarNotificacaoUseCaseRequest],
  Promise<EnviarNotificacaoUseCaseResponse>
>

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  inMemoryNotificacaoRepository = new InMemoryNotificacaoRepository()
  enviarNotificacaoUseCase = new EnviarNotificacaoUseCase(
    inMemoryNotificacaoRepository,
  )
  inMemoryPratoPedidoRepository = new InMemoryPratoPedidoRepository()

  enviarNotificacaoExecuteSpy = vi.spyOn(enviarNotificacaoUseCase, 'execute')

  new OnNovoPedidoCriado(inMemoryPratoRepository, enviarNotificacaoUseCase)
})

test('Dado uma notificação válida, ao executar o caso de uso EnviarNotificacaoUseCase, então ele deve enviar uma notificação', async () => {
  // Given
  const prato = makePratoFactory(null, new EntityID(1))
  const pratoPedido = makePratoPedidoFactory({ pratoId: prato.id })
  // When
  inMemoryPratoRepository.create(prato)
  inMemoryPratoPedidoRepository.create(pratoPedido)
  // Then
  await waitFor(() => {
    expect(enviarNotificacaoExecuteSpy).toHaveBeenCalled()
  })
})
