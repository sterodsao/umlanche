import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { NestCriarPratoPedidoUseCase } from '@/infra/nest/nest-criar-prato-pedido-use-case'
import { CriarPratoPedidoRequestDto } from '../dto/criar-prato-pedido-request.dto'

@Controller('/prato/pedido')
export class CriarPratoPedidoController {
  constructor(private sut: NestCriarPratoPedidoUseCase) {}

  @Post()
  async handle(@Body() body: CriarPratoPedidoRequestDto) {
    const { pratoId } = body

    const result = await this.sut.execute({ pratoId })

    if (result.isLeft()) throw new BadRequestException()
  }
}
