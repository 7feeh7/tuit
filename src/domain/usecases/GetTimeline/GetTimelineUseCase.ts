import { IPost } from '@domain/entities/IPost'
import { ICacheProvider } from '@domain/ports/ICacheProvider'
import { IPostRepository } from '@domain/ports/IPostRepository'
import { IUserRepository } from '@domain/ports/IUserRepository'
import { messages } from '@shared/messages'

export class GetTimelineUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly postRepository: IPostRepository,
    private readonly cacheProvider: ICacheProvider
  ) { }

  async execute(
    userId: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<IPost[]> {
    const cacheKey = `timeline:${userId}:page:${page}:perPage:${perPage}`
    const cached = await this.cacheProvider.get<IPost[]>(cacheKey)
    if (cached) return cached

    const user = await this.userRepository.findById(userId)
    if (!user) throw new Error(messages.follow.userNotFound)

    const followingIds = await this.userRepository.getFollowingIds(userId)
    if (!followingIds || followingIds.length === 0) return []

    const timeline = await this.postRepository.findPostsByAuthors(
      followingIds,
      page,
      perPage
    )
    await this.cacheProvider.set(cacheKey, timeline, 60)
    return timeline
  }
}
