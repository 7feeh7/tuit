import { IPost } from '../entities/IPost'

export interface IPostRepository {
  save(post: IPost): Promise<void>
  findPostsByAuthors(authorIds: string[], page?: number, perPage?: number): Promise<IPost[]>
}
