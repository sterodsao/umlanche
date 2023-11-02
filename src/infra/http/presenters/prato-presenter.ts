import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'

export class PratoPresenter {
  static toHTTP(prato: Prato) {
    return {
      id: prato.id.toString(),
      nome: prato.nome,
      ingredientes: prato.ingredientes,
      preco: prato.preco,
      ativo: prato.ativo,
      incluido_em: prato.incluidoEm,
      alterado_em: prato.atualizadoEm,
    }
  }
}
