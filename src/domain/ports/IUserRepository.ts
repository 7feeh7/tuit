import { IUser } from '../entities/IUser'

export interface IUserRepository {
  save(user: IUser): Promise<void>
  findByUsername(username: string): Promise<IUser | null>
  findById(id: string): Promise<IUser | null>
  isFollowing(followerId: string, followingId: string): Promise<boolean>
  addFollowing(followerId: string, followingId: string): Promise<void>
  addFollower(userId: string, followerId: string): Promise<void>
  findAll(): Promise<IUser[]>
  getFollowers(userId: string): Promise<IUser[]>
  getFollowing(userId: string): Promise<IUser[]>
  getFollowingIds(userId: string): Promise<string[]>
}
