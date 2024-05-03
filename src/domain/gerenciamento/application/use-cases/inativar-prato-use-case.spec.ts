import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import {
  InativarPratoUseCase,
  InativarPratoUseCaseRequest,
} from './inativar-prato-use-case'
import { EntityID } from '@/core/entities/entity-id'

let inMemoryPratoRepository: InMemoryPratoRepository
let sut: InativarPratoUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new InativarPratoUseCase(inMemoryPratoRepository)
})

test('Dado um prato que não existe, ao executar o caso de uso InativarPrato, então ele deve retornar um erro de Recurso não encontrado.', async () => {
  // Given
  const request: InativarPratoUseCaseRequest = {
    pratoId: 1,
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.value instanceof ResourceNotFoundError).toBeTruthy()
})

test('Dado um prato válido que pertence ao negocio correto, ao executar o caso de uso InativarPrato, ele deve ser desativado e salvo no repositório.', async () => {
  const prato = makePratoFactory(null, new EntityID(2))
  inMemoryPratoRepository.items.push(prato)

  // Given
  const request: InativarPratoUseCaseRequest = {
    pratoId: prato.id.toValue(),
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
  expect(pratoAtualizado?.ativo).toBe(false)
})
