import { NestObterPratoUseCase } from '@/infra/nest/nest-obter-prato-use-case'
import { Controller, Query, BadRequestException, Get } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { PratoPresenter } from '../presenters/prato-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/prato')
export class ObterPratosController {
  constructor(private sut: NestObterPratoUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.sut.execute({
      page,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const pratos = result.value.pratos
    return { pratos: pratos.map(PratoPresenter.toHTTP) }
  }
}
