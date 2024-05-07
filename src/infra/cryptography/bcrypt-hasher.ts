import { HashComparer } from '@/core/cryptography/hash-comparer'
import { HashGenerator } from '@/core/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string, salt?: number): Promise<string> {
    return hash(plain, salt || this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
