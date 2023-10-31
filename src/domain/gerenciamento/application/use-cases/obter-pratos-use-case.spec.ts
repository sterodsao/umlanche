import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import { ObterPratosUseCase } from './obter-pratos-use-case'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'

let inMemoryPratoRepository: InMemoryPratoRepository
let sut: ObterPratosUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new ObterPratosUseCase(inMemoryPratoRepository)
})

test('Ao obter sugestões de pratos com sucesso, deve retornar a lista de pratos', async () => {
  const prato1 = makePratoFactory()
  const prato2 = makePratoFactory()
  const prato3 = makePratoFactory()
  inMemoryPratoRepository.items.push(prato1)
  inMemoryPratoRepository.items.push(prato2)
  inMemoryPratoRepository.items.push(prato3)

  // Given
  const request = { page: 1 }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
  expect(result.value?.pratos).toHaveLength(3)
  expect(result.value?.pratos[1]).toEqual(prato2)
})

test('Ao obter pratos com sucesso, deve retornar a lista de pratos com apenas 20 pratos na página 1', async () => {
  for (let i = 1; i <= 22; i++) {
    await inMemoryPratoRepository.create(makePratoFactory())
  }

  // Given
  const request = { page: 1 }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
  expect(result.value?.pratos).toHaveLength(20)
})

test('Ao obter pratos com sucesso, deve retornar a lista de pratos com apenas 2 pratos na página 2', async () => {
  for (let i = 1; i <= 22; i++) {
    await inMemoryPratoRepository.create(makePratoFactory())
  }

  // Given
  const request = { page: 2 }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
  expect(result.value?.pratos).toHaveLength(2)
})

test('Ao obter pratos com sucesso, deve retornar uma lista vazia se a página estiver vazia', async () => {
  // Dado alguns pratos no repositório
  inMemoryPratoRepository.items.push(makePratoFactory())

  // Given
  const request = { page: 2 } // Página vazia

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
  expect(result.value?.pratos).toHaveLength(0)
})
