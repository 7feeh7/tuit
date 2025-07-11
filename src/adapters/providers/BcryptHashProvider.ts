import { IHashProvider } from '@domain/ports/IHashProvider'
import bcrypt from 'bcrypt'

export class BcryptHashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10)
  }
  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed)
  }
}