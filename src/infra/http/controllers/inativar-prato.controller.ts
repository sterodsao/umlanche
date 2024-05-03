import { NestInativarPratoUseCase } from '@/infra/nest/nest-inativar-prato-use-case'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/prato/:id/inativar')
export class InativarPratoController {
  constructor(private sut: NestInativarPratoUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') idPrato: string) {
    const result = await this.sut.execute({ pratoId: Number(idPrato) })
    if (result.isLeft()) throw new BadRequestException(result.value.message)
  }
}
