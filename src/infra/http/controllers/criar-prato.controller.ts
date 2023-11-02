import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { NestCriarPratoUseCase } from '@/infra/nest/nest-criar-prato-use-case'

const criarPratoBodySchema = z.object({
  nome: z.string().min(3).max(100),
  ingredientes: z.string().min(3).max(200),
  preco: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(criarPratoBodySchema)

type CriarPratoBodySchema = z.infer<typeof criarPratoBodySchema>

@Controller('/prato')
export class CriarPratoController {
  constructor(private sut: NestCriarPratoUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CriarPratoBodySchema) {
    const { nome, ingredientes, preco } = body

    const result = await this.sut.execute({ nome, ingredientes, preco })

    if (result.isLeft()) throw new BadRequestException()
  }
}
