import { PratoPedido } from '@/domain/gerenciamento/enterprise/entities/prato-pedido'

export class PratoPedidoPresenter {
  static toHTTP(pratoPedido: PratoPedido) {
    return {
      solicitadoEm: pratoPedido.solicitadoEm,
      retiradoEm: pratoPedido.retiradoEm,
      concluido: pratoPedido.statusPratoPedidoConcluido,
    }
  }
}
