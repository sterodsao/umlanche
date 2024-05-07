import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { PratoPedidoFactory } from 'test/factories/gerenciamento/make-prato-pedido-factory'
import request from 'supertest'
import { EntityID } from '@/core/entities/entity-id'

describe('Validar status prato pedido (E2E)', () => {
  let app: INestApplication
  let pratoFactory: PratoFactory
  let pratoPedidoFactory: PratoPedidoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PratoFactory, PratoPedidoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    pratoFactory = moduleRef.get(PratoFactory)
    pratoPedidoFactory = moduleRef.get(PratoPedidoFactory)

    await app.init()
  })

  test('[GET] /prato/pedido', async () => {
    await pratoFactory.makePrismaPrato(null, new EntityID(1))
    const pratoPedido = await pratoPedidoFactory.makePrismaPratoPedido({
      pratoId: new EntityID(1),
    })

    const response = await request(app.getHttpServer())
      .get(`/prato/pedido/${pratoPedido.idExterno.toString()}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      pratoPedido: expect.objectContaining({
        solicitadoEm: pratoPedido.solicitadoEm.toISOString(),
        retiradoEm: null,
        concluido: false,
      }),
    })
  })
})
