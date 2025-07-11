import { IPostRepository } from '@domain/ports/IPostRepository'
import { IPost } from '@domain/entities/IPost'
import { PostModel } from '@adapters/database/models/PostModel'

export class PostRepositoryMongo implements IPostRepository {
  async save(post: IPost): Promise<void> {
    await PostModel.create({
      _id: post.id,
      authorId: post.authorId,
      content: post.content,
      likes: post.likes,
      replies: post.replies,
      createdAt: post.createdAt,
      hashtags: post.hashtags,
      referenceId: post.referenceId,
      mediaUrl: post.mediaUrl
    })
  }

  async findPostsByAuthors(
    authorIds: string[],
    page = 1,
    perPage = 10
  ): Promise<IPost[]> {
    const skip = (page - 1) * perPage

    const posts: any = await await PostModel.aggregate([
      {
        $addFields: {
          authorIdObj: { $toObjectId: '$authorId' }
        }
      },
      { $match: { authorId: { $in: authorIds } } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
      {
        $lookup: {
          from: 'users',
          localField: 'authorIdObj',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          _id: 1,
          content: 1,
          likes: 1,
          replies: 1,
          createdAt: 1,
          hashtags: 1,
          referenceId: 1,
          mediaUrl: 1,
          author: {
            _id: '$author._id',
            username: '$author.username',
            displayName: '$author.displayName',
            avatarUrl: '$author.avatarUrl'
          }
        }
      }
    ])

    return posts
  }
}
