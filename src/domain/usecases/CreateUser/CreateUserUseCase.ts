import { IUserRepository } from '@domain/ports/IUserRepository'
import { ICreateUserDTO } from '@domain/usecases/CreateUser/ICreateUserDTO'
import { IUser } from '@domain/entities/IUser'
import { messages } from '@shared/messages'
import { IHashProvider } from '@domain/ports/IHashProvider'

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashProvider: IHashProvider
  ) { }

  async execute(data: ICreateUserDTO): Promise<IUser> {
    const exists = await this.userRepository.findByUsername(data.username)

    if (exists) throw new Error(messages.user.usernameExists)

    const now = new Date()

    const hashedPassword = await this.hashProvider.hash(data.password)

    const user: IUser = {
      username: data.username,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    }

    await this.userRepository.save(user)
    return user
  }
}
