import { randomUUID } from 'node:crypto'

export class EntityID {
  private value: number | string

  toString() {
    return this.value.toString()
  }

  toValue() {
    return Number(this.value)
  }

  constructor(value?: number | string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: EntityID) {
    return (id.toValue() || id.toString()) === this.value
  }
}
