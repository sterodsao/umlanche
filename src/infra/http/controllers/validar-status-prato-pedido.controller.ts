import { NestValidarPratoPedidoUseCase } from '@/infra/nest/nest-validar-prato-pedido-use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { PratoPedidoPresenter } from '../presenters/prato-pedido-presenter'

@Controller('/prato/pedido/:idExterno')
export class ValidarStatusPratoPedidoController {
  constructor(private sut: NestValidarPratoPedidoUseCase) {}

  @Get()
  async handle(@Param('idExterno') idExterno: string) {
    const result = await this.sut.execute({ idExterno })
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
    return {
      pratoPedido: PratoPedidoPresenter.toHTTP(result.value.pratoPedido),
    }
  }
}
