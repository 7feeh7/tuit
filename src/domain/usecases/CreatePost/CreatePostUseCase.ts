import { IPostRepository } from '@domain/ports/IPostRepository'
import { ICreatePostDTO } from './ICreatePostDTO'
import { IPost } from '@domain/entities/IPost'

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) { }

  async execute(data: ICreatePostDTO): Promise<IPost> {

    const now = new Date()

    const post: IPost = {
      authorId: data.authorId,
      content: data.content,
      likes: 0,
      replies: 0,
      createdAt: now,
      hashtags: data.hashtags ?? [],
      referenceId: data.referenceId,
      mediaUrl: data.mediaUrl
    }

    await this.postRepository.save(post)

    return post
  }
}
