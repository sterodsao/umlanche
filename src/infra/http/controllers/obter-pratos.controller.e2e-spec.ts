import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { PratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Obter pratos (E2E)', () => {
  let app: INestApplication
  let pratoFactory: PratoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PratoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    pratoFactory = moduleRef.get(PratoFactory)

    await app.init()
  })

  test('[GET] /prato', async () => {
    await Promise.all([
      pratoFactory.makePrismaPrato({
        nome: 'Prato 01',
      }),
      pratoFactory.makePrismaPrato({
        nome: 'Prato 02',
      }),
    ])

    const response = await request(app.getHttpServer()).get('/prato').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      pratos: expect.arrayContaining([
        expect.objectContaining({ nome: 'Prato 01' }),
        expect.objectContaining({ nome: 'Prato 02' }),
      ]),
    })
  })
})
