import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import {
  AtivarPratoUseCase,
  AtivarPratoUseCaseRequest,
} from './ativar-prato-use-case'

let inMemoryPratoRepository: InMemoryPratoRepository
let sut: AtivarPratoUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new AtivarPratoUseCase(inMemoryPratoRepository)
})

test('Dado um serviço que não existe, ao executar o caso de uso AtivarPrato, então ele deve retornar um erro de Recurso não encontrado.', async () => {
  // Given
  const request: AtivarPratoUseCaseRequest = {
    pratoId: '1',
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.value instanceof ResourceNotFoundError).toBeTruthy()
})

test('Dado um serviço válido que pertence ao negocio correto, ao executar o caso de uso AtivarPrato, ele deve ser desativado e salvo no repositório.', async () => {
  const prato = makePratoFactory()
  inMemoryPratoRepository.items.push(prato)

  // Given
  const request: AtivarPratoUseCaseRequest = {
    pratoId: prato.id.toString(),
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isLeft()).toBeFalsy()
  expect(result.isRight()).toBeTruthy()
  const pratoAtualizado = inMemoryPratoRepository.items.find(
    (s) => s.id.toString() === prato.id.toString(),
  )
  expect(pratoAtualizado).toBeDefined()
  expect(pratoAtualizado?.ativo).toBe(true)
})
