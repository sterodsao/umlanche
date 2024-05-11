import { InMemoryNotificacaoRepository } from 'test/repositories/notificacao/in-memory-notificacao-repository'
import {
  EnviarNotificacaoUseCase,
  EnviarNotificacaoUseCaseRequest,
} from './enviar-notificacao-use-case'

let inMemoryNotificacaoRepository: InMemoryNotificacaoRepository
let sut: EnviarNotificacaoUseCase

beforeEach(() => {
  inMemoryNotificacaoRepository = new InMemoryNotificacaoRepository()
  sut = new EnviarNotificacaoUseCase(inMemoryNotificacaoRepository)
})

test('Dado uma notificação válida, ao executar o caso de uso EnviarNotificacaoUseCase, então ele deve enviar uma notificação', async () => {
  // Given
  const request: EnviarNotificacaoUseCaseRequest = {
    identificadorId: '1',
    titulo: 'Nova notificação',
    conteudo: 'Conteúdo da notificação',
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isRight()).toBeTruthy()
  expect(inMemoryNotificacaoRepository.items[0]).toEqual(
    result.value.notificacao,
  )
})
