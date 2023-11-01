import { Prato } from '@/domain/gerenciamento/enterprise/entities/prato'

export class PratoPresenter {
  static toHTTP(prato: Prato) {
    return {
      id: prato.id.toString(),
      nome: prato.nome,
      descricao: prato.descricao,
      preco: prato.preco,
      ativo: prato.ativo,
      incluido_em: prato.incluidoEm,
      atualizado_em: prato.atualizadoEm,
    }
  }
}
