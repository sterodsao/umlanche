import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { NestCriarPratoUseCase } from '@/infra/nest/nest-criar-prato-use-case'
import { CriarPratoRequestDto } from '../dto/criar-prato-request.dto'

@Controller('/prato')
export class CriarPratoController {
  constructor(private sut: NestCriarPratoUseCase) {}

  @Post()
  async handle(@Body() body: CriarPratoRequestDto) {
    const { nome, ingredientes, preco } = body

    const result = await this.sut.execute({ nome, ingredientes, preco })

    if (result.isLeft()) throw new BadRequestException()
  }
}
