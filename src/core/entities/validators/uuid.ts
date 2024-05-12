export class UUIDValidator {
  private value: string
  private pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  constructor(value: string) {
    this.value = value
  }

  validate(): boolean {
    return this.pattern.test(this.value)
  }
}
