import { NestAtivarPratoUseCase } from '@/infra/nest/nest-ativar-prato-use-case'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/prato/:id/ativar')
export class AtivarPratoController {
  constructor(private sut: NestAtivarPratoUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@Param('id') idPrato: string) {
    const result = await this.sut.execute({ pratoId: idPrato })
    if (result.isLeft()) throw new BadRequestException(result.value.message)
  }
}
