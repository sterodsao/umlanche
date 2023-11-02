import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { NestAtualizarPratoUseCase } from '@/infra/nest/nest-atualizar-prato-use-case'

const atualizarPratoBodySchema = z.object({
  nome: z.string().min(3).max(100).optional(),
  ingredientes: z.string().min(3).max(200).optional(),
  preco: z.number().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(atualizarPratoBodySchema)

type AtualizarPratoBodySchema = z.infer<typeof atualizarPratoBodySchema>

@Controller('/prato/:id')
export class AtualizarPratoController {
  constructor(private sut: NestAtualizarPratoUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: AtualizarPratoBodySchema,
    @Param('id') pratoId: string,
  ) {
    const { nome, ingredientes, preco } = body

    const result = await this.sut.execute({
      pratoId,
      nome,
      ingredientes,
      preco,
    })

    if (result.isLeft()) throw new BadRequestException(result.value.message)
  }
}
