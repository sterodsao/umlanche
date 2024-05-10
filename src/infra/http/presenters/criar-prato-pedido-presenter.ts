import { PratoPedido } from '@/domain/gerenciamento/enterprise/entities/prato-pedido'

export class CriarPratoPedidoPresenter {
  static toHTTP(pratoPedido: PratoPedido) {
    return {
      idExterno: pratoPedido.idExterno.toString(),
    }
  }
}
