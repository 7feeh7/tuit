import { IUserRepository } from '@domain/ports/IUserRepository'
import { IFollowUserDTO } from './IFollowUserDTO'
import { messages } from '@shared/messages'

export class FollowUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: IFollowUserDTO): Promise<void> {
    if (data.followerId === data.followingId) {
      throw new Error(messages.follow.cannotFollowYourself)
    }

    const follower = await this.userRepository.findById(data.followerId)
    const following = await this.userRepository.findById(data.followingId)
    if (!follower || !following) throw new Error(messages.follow.userNotFound)

    const alreadyFollowing = await this.userRepository.isFollowing(
      data.followerId,
      data.followingId
    )
    if (alreadyFollowing) throw new Error(messages.follow.alreadyFollowing)

    await this.userRepository.addFollowing(data.followerId, data.followingId)
    await this.userRepository.addFollower(data.followingId, data.followerId)
  }
}
