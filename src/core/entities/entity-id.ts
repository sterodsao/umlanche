import { randomUUID } from 'node:crypto'

export class EntityID {
  private value: number | string

  toString() {
    return this.value
  }

  toValue() {
    return Number(this.value)
  }

  constructor(value?: number) {
    this.value = value ?? randomUUID()
  }

  public equals(id: EntityID) {
    return id.toValue() === this.value
  }
}
