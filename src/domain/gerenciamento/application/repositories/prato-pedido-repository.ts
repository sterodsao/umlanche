import { PratoPedido } from '../../enterprise/entities/prato-pedido'

export abstract class PratoPedidoRepository {
  abstract findByIdExterno(id: string): Promise<PratoPedido | null>
  abstract create(pratoPedido: PratoPedido): Promise<void>
}
