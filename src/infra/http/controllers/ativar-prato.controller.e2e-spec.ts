import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PratoFactory } from 'test/factories/gerenciamento/make-prato-factory'

describe('Ativar prato (E2E)', () => {
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

  test('[PATCH] /prato/:id/ativar', async () => {
    const prato = await pratoFactory.makePrismaPrato({ ativo: false })
    const pratoId = prato.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/prato/${pratoId}/ativar`)
      .send()

    expect(response.statusCode).toBe(204)

    const pratoOnDatabase = await prisma.prato.findFirst({
      where: {
        id_prato: pratoId,
        fg_ativo: true,
      },
    })

    expect(pratoOnDatabase).toBeTruthy()
  })
})
