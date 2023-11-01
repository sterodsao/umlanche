import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import { Prato } from '../../enterprise/entities/prato'
import {
  AtualizarPratoUseCase,
  AtualizarPratoUseCaseRequest,
} from './atualizar-prato-use-case'
import { InvalidArgumentPrecoError } from './errors/invalid-argument-preco'

let inMemoryPratoRepository: InMemoryPratoRepository
let sut: AtualizarPratoUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new AtualizarPratoUseCase(inMemoryPratoRepository)
})

test('Dado um prato que não existe, ao executar o caso de uso AtualizarPrato, ele deve retornar um erro de Recurso não encontrado.', async () => {
  // Given
  const request: AtualizarPratoUseCaseRequest = {
    pratoId: '1',
    nome: 'Novo nome',
    descricao: 'Nova descrição',
    preco: 10,
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.isRight()).toBeFalsy()
  expect(result.value instanceof ResourceNotFoundError).toBeTruthy()
})

test('Dado um prato válido, ao executar o caso de uso EditarPrato, ele deve ser atualizado e salvo no repositório.', async () => {
  // Given
  const prato = makePratoFactory()
  inMemoryPratoRepository.items.push(prato)

  const request: AtualizarPratoUseCaseRequest = {
    pratoId: prato.id.toString(),
    nome: 'Novo nome',
    descricao: 'Nova descrição',
    preco: 10,
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
  expect((result.value as { prato: Prato }).prato.id).toEqual(prato.id)
  expect((result.value as { prato: Prato }).prato.nome).toEqual(request.nome)
  expect((result.value as { prato: Prato }).prato.preco).toEqual(request.preco)

  // Verificar se o serviço foi atualizado no repositório
  const pratoAtualizado = await inMemoryPratoRepository.findById(
    prato.id.toString(),
  )
  expect(pratoAtualizado).toBeDefined()
  expect(pratoAtualizado?.nome).toEqual(request.nome)
  expect(pratoAtualizado?.preco).toEqual(request.preco)
})

test('Ao fornecer parâmetros de entrada inválidos, ele deve retornar um erro de validação', async () => {
  const prato = makePratoFactory()
  inMemoryPratoRepository.items.push(prato)

  // Given
  const request: AtualizarPratoUseCaseRequest = {
    pratoId: prato.id.toString(),
    nome: 'Novo nome',
    descricao: 'Nova descrição',
    preco: -10,
  }

  // When
  const result = await sut.execute(request)

  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.isRight()).toBeFalsy()
  expect(result.value instanceof InvalidArgumentPrecoError).toBeTruthy()
})
