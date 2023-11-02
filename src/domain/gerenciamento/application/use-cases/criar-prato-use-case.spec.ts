import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import {
  CriarPratoUseCase,
  CriarPratoUseCaseRequest,
} from './criar-prato-use-case'
import { Prato } from '../../enterprise/entities/prato'
import { InvalidArgumentPrecoError } from './errors/invalid-argument-preco'

let inMemoryPratoRepository: InMemoryPratoRepository
let sut: CriarPratoUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new CriarPratoUseCase(inMemoryPratoRepository)
})

test('Dado informações válidas, ao executar o caso de uso CriarPrato, então ele deve retornar o prato criado.', async () => {
  // Given
  const request: CriarPratoUseCaseRequest = {
    nome: 'Prato 01',
    ingredientes: 'Descrição prato 01',
    preco: 5,
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isLeft()).toBeFalsy()
  expect(result.isRight()).toBeTruthy()
  expect((result.value as { prato: Prato }).prato.nome).toEqual(request.nome)
  expect(inMemoryPratoRepository.items).toHaveLength(1)
  expect(inMemoryPratoRepository.items[0]).toEqual(
    (result.value as { prato: Prato }).prato,
  )
})

test('Dado informações inválidas, ao executar o caso de uso CriarPrato, então ele deve retornar o erro InvalidArgumentPrecoError.', async () => {
  // Given
  const request: CriarPratoUseCaseRequest = {
    nome: 'Prato 01',
    ingredientes: 'Descrição prato 01',
    preco: -5,
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.isRight()).toBeFalsy()
  expect(result.value instanceof InvalidArgumentPrecoError).toBeTruthy()
})
