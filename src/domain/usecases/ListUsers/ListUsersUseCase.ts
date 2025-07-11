import { IUser } from '@domain/entities/IUser'
import { IUserRepository } from '@domain/ports/IUserRepository'

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(): Promise<IUser[]> {
    return this.userRepository.findAll()
  }
}
