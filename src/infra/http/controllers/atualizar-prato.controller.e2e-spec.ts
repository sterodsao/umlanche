import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PratoFactory } from 'test/factories/gerenciamento/make-prato-factory'

describe('Atualizar prato (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let pratoFactory: PratoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PratoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    pratoFactory = moduleRef.get(PratoFactory)

    await app.init()
  })

  test('[PUT] /prato/:id', async () => {
    const prato = await pratoFactory.makePrismaPrato()
    const pratoId = prato.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/prato/${pratoId}`)
      .send({
        nome: 'Prato atualizado',
        ingredientes: 'Descrição nova',
        preco: 56.15,
      })

    console.log(response.body.errors)
    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.prato.findFirst({
      where: {
        ds_nome: 'Prato atualizado',
        ds_ingredientes: 'Descrição nova',
      },
    })

    expect(questionOnDatabase).toBeTruthy()
  })
})
