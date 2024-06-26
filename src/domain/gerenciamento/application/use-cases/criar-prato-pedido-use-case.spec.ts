import { InMemoryPratoPedidoRepository } from 'test/repositories/gerenciamento/in-memory-prato-pedido-repository'
import {
  CriarPratoPedidoUseCase,
  CriarPratoPedidoUseCaseRequest,
} from './criar-prato-pedido-use-case'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { EntityID } from '@/core/entities/entity-id'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryPratoRepository: InMemoryPratoRepository
let inMemoryPratoPedidoRepository: InMemoryPratoPedidoRepository
let fakeHasher: FakeHasher
let sut: CriarPratoPedidoUseCase

beforeEach(() => {
  inMemoryPratoRepository = new InMemoryPratoRepository()
  inMemoryPratoPedidoRepository = new InMemoryPratoPedidoRepository()
  fakeHasher = new FakeHasher()
  sut = new CriarPratoPedidoUseCase(
    inMemoryPratoRepository,
    inMemoryPratoPedidoRepository,
    fakeHasher,
  )
})

test('Dado informações válidas, ao executar o caso de uso CriarPratoPedido, então ele deve retornar prato pedido criado.', async () => {
  const prato1 = makePratoFactory(null, new EntityID(1))
  inMemoryPratoRepository.items.push(prato1)

  // Given
  const request: CriarPratoPedidoUseCaseRequest = {
    pratoId: 1,
    emailResponsavel: 'test@mail.com',
  }
  // When
  const result = await sut.execute(request)
  const hashedEmailResponsavel = await fakeHasher.hash('test@mail.com')
  // Then
  expect(result.isLeft()).toBeFalsy()
  expect(result.isRight()).toBeTruthy()
  expect(
    (
      result.value as { pratoPedido: PratoPedido }
    ).pratoPedido.pratoId.toValue(),
  ).toEqual(request.pratoId)
  expect(inMemoryPratoPedidoRepository.items).toHaveLength(1)
  expect(inMemoryPratoPedidoRepository.items[0]).toEqual(
    (result.value as { pratoPedido: PratoPedido }).pratoPedido,
  )
  expect(inMemoryPratoPedidoRepository.items[0].emailResponsavel).toEqual(
    hashedEmailResponsavel,
  )
})

test('Dado informações inválidas, ao executar o caso de uso CriarPrato, então ele deve retornar o erro InvalidArgumentPrecoError.', async () => {
  // Given
  const request: CriarPratoPedidoUseCaseRequest = {
    pratoId: 2,
    emailResponsavel: 'test@mail.com',
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.isRight()).toBeFalsy()
  expect(result.value instanceof ResourceNotFoundError).toBeTruthy()
})
