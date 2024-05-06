import { InMemoryPratoPedidoRepository } from 'test/repositories/gerenciamento/in-memory-prato-pedido-repository'
import {
  ValidarStatusPratoPedidoUseCase,
  ValidarStatusPratoPedidoUseCaseRequest,
} from './validar-status-prato-pedido-use-case'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InMemoryPratoRepository } from 'test/repositories/gerenciamento/in-memory-prato-repository'
import { makePratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { EntityID } from '@/core/entities/entity-id'
import { makePratoPedidoFactory } from 'test/factories/gerenciamento/make-prato-pedido-factory'
import { PratoPedido } from '../../enterprise/entities/prato-pedido'

let inMemoryPratoPedidoRepository: InMemoryPratoPedidoRepository
let inMemoryPratoRepository: InMemoryPratoRepository
let sut: ValidarStatusPratoPedidoUseCase

beforeEach(() => {
  inMemoryPratoPedidoRepository = new InMemoryPratoPedidoRepository()
  inMemoryPratoRepository = new InMemoryPratoRepository()
  sut = new ValidarStatusPratoPedidoUseCase(inMemoryPratoPedidoRepository)
})

test('Dado um pedido que não existe, ao executar o caso de uso ValidarStatusPratoPedidoUseCase, então ele deve retornar um erro de ResourceNotFoundError.', async () => {
  // Given
  const request: ValidarStatusPratoPedidoUseCaseRequest = {
    idExterno: '1',
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isLeft()).toBeTruthy()
  expect(result.value instanceof ResourceNotFoundError).toBeTruthy()
})

test('Dado um pedido válido, ao executar o caso de uso ValidarStatusPratoPedidoUseCase, então ele deve retornar os dados do pedido.', async () => {
  const prato = makePratoFactory(null, new EntityID(1))
  inMemoryPratoRepository.items.push(prato)
  const pratoPedido = makePratoPedidoFactory(
    { idExterno: new EntityID('1'), pratoId: prato.id },
    new EntityID(1),
  )
  inMemoryPratoPedidoRepository.items.push(pratoPedido)

  // Given
  const request: ValidarStatusPratoPedidoUseCaseRequest = {
    idExterno: pratoPedido.idExterno.toString(),
  }
  // When
  const result = await sut.execute(request)
  // Then
  expect(result.isLeft()).toBeFalsy()
  expect(result.value instanceof ResourceNotFoundError).toBeFalsy()
  expect(result.isRight()).toBeTruthy()
  expect(
    (result.value as { pratoPedido: PratoPedido }).pratoPedido.idExterno,
  ).toEqual(pratoPedido.idExterno)
  expect(inMemoryPratoPedidoRepository.items[0]).toEqual(
    (result.value as { pratoPedido: PratoPedido }).pratoPedido,
  )
})
