import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Criar prato (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /prato', async () => {
    const response = await request(app.getHttpServer()).post('/prato').send({
      nome: 'Feijoada',
      descricao: 'Prato de feijoada delicioso',
      preco: 29.3,
    })

    expect(response.statusCode).toBe(201)

    const pratoOnDatabase = await prisma.prato.findFirst({
      where: { ds_nome: 'Feijoada' },
    })

    expect(pratoOnDatabase).toBeTruthy()
  })
})