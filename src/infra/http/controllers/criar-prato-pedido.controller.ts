import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { NestCriarPratoPedidoUseCase } from '@/infra/nest/nest-criar-prato-pedido-use-case'
import { CriarPratoPedidoRequestDto } from '../dto/criar-prato-pedido-request.dto'
import { CriarPratoPedidoPresenter } from '../presenters/criar-prato-pedido-presenter'

@Controller('/prato/pedido')
export class CriarPratoPedidoController {
  constructor(private sut: NestCriarPratoPedidoUseCase) {}

  @Post()
  async handle(@Body() body: CriarPratoPedidoRequestDto) {
    const { pratoId, emailResponsavel } = body

    const result = await this.sut.execute({ pratoId, emailResponsavel })

    if (result.isLeft()) throw new BadRequestException()

    return {
      pratoPedido: CriarPratoPedidoPresenter.toHTTP(result.value.pratoPedido),
    }
  }
}
