// src/adapters/database/UserRepositoryMongo.ts
import { IUserRepository } from '@domain/ports/IUserRepository'
import { IUser } from '@domain/entities/IUser'
import { UserModel } from '@adapters/database/models/UserModel'
import { UserFollowModel } from '@adapters/database/models/UserFollowModel'
import { Types } from 'mongoose'

export class UserRepositoryMongo implements IUserRepository {
  async save(user: IUser): Promise<void> {
    await UserModel.create(user)
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ username })
    if (!user) return null

    return {
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id)
    if (!user) return null
    return {
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const result = await UserFollowModel.findOne({
      followerId: new Types.ObjectId(followerId),
      followingId: new Types.ObjectId(followingId),
    })
    return !!result
  }

  async addFollowing(followerId: string, followingId: string): Promise<void> {
    await UserFollowModel.updateOne(
      {
        followerId: new Types.ObjectId(followerId),
        followingId: new Types.ObjectId(followingId)
      },
      {},
      { upsert: true }
    )
  }

  async addFollower(userId: string, followerId: string): Promise<void> {
    await UserFollowModel.updateOne(
      {
        followerId: new Types.ObjectId(followerId),
        followingId: new Types.ObjectId(userId)
      },
      {},
      { upsert: true }
    )
  }

  async getFollowers(userId: string): Promise<IUser[]> {
    const follows = await UserFollowModel
      .find({ followingId: userId })
      .populate('followerId')


    return follows.map(follow => {
      const user = follow.followerId as any
      return {
        id: user._id.toString(),
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })
  }

  async getFollowing(userId: string): Promise<IUser[]> {
    const follows = await UserFollowModel
      .find({ followerId: userId })
      .populate('followingId')

    return follows.map(follow => {
      const user = follow.followingId as any
      return {
        id: user._id.toString(),
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })
  }

  async findAll(): Promise<IUser[]> {
    const users = await UserModel.find()
    return users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }

  async getFollowingIds(userId: string): Promise<string[]> {
    const follows = await UserFollowModel
      .find({ followerId: userId }, { followingId: 1, _id: 0 })
    return follows.map(f => f.followingId.toString())
  }

  async findAllPaginated(params: { search: string, page: number, limit: number }): Promise<IUser[]> {
    const { search = '', page = 1, limit = 20 } = params

    const filter: any = {}

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (page - 1) * limit

    const users = await UserModel.find(filter)
      .skip(skip)
      .limit(limit)

    return users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }
}
