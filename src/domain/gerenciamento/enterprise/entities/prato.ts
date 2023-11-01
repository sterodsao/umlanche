import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import dayjs from 'dayjs'

export interface PratoProps {
  nome: string
  descricao: string
  preco: number
  ativo: boolean
  incluidoEm: Date
  atualizadoEm?: Date | null
}

export class Prato extends Entity<PratoProps> {
  get nome() {
    return this.props.nome
  }

  set nome(nome: string) {
    this.props.nome = nome
    this.atualiza()
  }

  get descricao() {
    return this.props.descricao
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao
    this.atualiza()
  }

  get preco() {
    return this.props.preco
  }

  set preco(preco: number) {
    this.props.preco = +preco.toFixed(2)
    this.atualiza()
  }

  get ativo() {
    return this.props.ativo
  }

  set ativo(ativo: boolean) {
    this.props.ativo = ativo
    this.atualiza()
  }

  get incluidoEm() {
    return this.props.incluidoEm
  }

  get atualizadoEm() {
    return this.props.atualizadoEm
  }

  get eRecente() {
    return dayjs().diff(this.incluidoEm, 'days') <= 10
  }

  private atualiza() {
    this.props.atualizadoEm = new Date()
  }

  static create(
    props: Optional<PratoProps, 'incluidoEm' | 'ativo'>,
    id?: UniqueEntityID,
  ) {
    return new Prato(
      {
        ...props,
        preco: +props.preco.toFixed(2),
        ativo: props.ativo ?? true,
        incluidoEm: props.incluidoEm ?? new Date(),
      },
      id,
    )
  }
}
