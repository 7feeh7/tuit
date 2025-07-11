import { IUser } from '@domain/entities/IUser'
import { IUserRepository } from '@domain/ports/IUserRepository'
import { PaginationParams } from '@shared/interfaces/IPaginationParams'

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(params: PaginationParams): Promise<IUser[]> {
    return this.userRepository.findAllPaginated(params)
  }
}
