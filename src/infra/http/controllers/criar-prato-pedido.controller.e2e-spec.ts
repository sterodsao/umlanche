import { AppModule } from '@/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PratoFactory } from 'test/factories/gerenciamento/make-prato-factory'
import { EntityID } from '@/core/entities/entity-id'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { HashComparer } from '@/core/cryptography/hash-comparer'

describe('Criar prato pedido (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let pratoFactory: PratoFactory
  let hashComparer: HashComparer

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [PratoFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    pratoFactory = moduleRef.get(PratoFactory)
    hashComparer = moduleRef.get(HashComparer)

    await app.init()
  })

  test('[POST] /prato/pedido', async () => {
    const prato = await pratoFactory.makePrismaPrato(
      { ativo: true },
      new EntityID(1),
    )
    const pratoId = prato.id.toValue()
    const emailResponsavel = 'test@mail.com'

    const response = await request(app.getHttpServer())
      .post('/prato/pedido')
      .send({
        pratoId,
        emailResponsavel,
      })

    expect(response.statusCode).toBe(201)

    const pratoPedidoOnDatabase = await prisma.pedido.findFirst({
      where: { id_prato: pratoId },
    })

    const compareEmailResponsavel = await hashComparer.compare(
      emailResponsavel,
      pratoPedidoOnDatabase.ds_email_responsavel,
    )

    expect(pratoPedidoOnDatabase).toBeTruthy()
    expect(pratoPedidoOnDatabase.id_prato).toEqual(pratoId)
    expect(compareEmailResponsavel).toBeTruthy()
  })
})
