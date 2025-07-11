import { Request, Response } from 'express'
import { CreateUserUseCase } from '@domain/usecases/CreateUser/CreateUserUseCase'
import { FollowUserUseCase } from '@domain/usecases/FollowUser/FollowUserUseCase'
import { ListUsersUseCase } from '@domain/usecases/ListUsers/ListUsersUseCase'

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly followUserUseCase: FollowUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase

  ) { }

  async create(req: Request, res: Response) {
    try {
      const dto = req.body
      const user = await this.createUserUseCase.execute(dto)
      res.status(201).json(user)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const { followerId, followingId } = req.body
      await this.followUserUseCase.execute({ followerId, followingId })
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { search = '', page = 1, limit = 20 } = req.query

      const params = {
        search: String(search),
        page: Number(page),
        limit: Number(limit),
      }

      const users = await this.listUsersUseCase.execute(params)
      res.status(200).json(users)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}
