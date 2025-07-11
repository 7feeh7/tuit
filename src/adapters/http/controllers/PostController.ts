import { Request, Response } from 'express'
import { CreatePostUseCase } from '@domain/usecases/CreatePost/CreatePostUseCase'
import { GetTimelineUseCase } from '@domain/usecases/GetTimeline/GetTimelineUseCase'

export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getTimelineUseCase: GetTimelineUseCase
  ) { }

  async create(req: Request, res: Response) {
    try {
      const dto = req.body
      const post = await this.createPostUseCase.execute(dto)
      res.status(201).json(post)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  }

  async timeline(req: Request, res: Response) {
    try {
      const userId = req.params.userId
      const { page, perPage } = req.query

      const posts = await this.getTimelineUseCase.execute(
        userId,
        Number(page),
        Number(perPage)
      )

      res.status(200).json(posts)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  }
}
