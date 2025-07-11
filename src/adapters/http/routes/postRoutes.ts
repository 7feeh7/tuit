import { Router } from 'express'
import { PostRepositoryMongo } from '@adapters/database/PostRepositoryMongo'
import { CreatePostUseCase } from '@domain/usecases/CreatePost/CreatePostUseCase'
import { PostController } from '@adapters/http/controllers/PostController'
import { GetTimelineUseCase } from '@domain/usecases/GetTimeline/GetTimelineUseCase'
import { UserRepositoryMongo } from '@adapters/database/UserRepositoryMongo'
import { RedisCacheProvider } from '@adapters/cache/RedisCacheProvider'

const router = Router()

const userRepository = new UserRepositoryMongo()
const postRepository = new PostRepositoryMongo()
const cacheProvider = new RedisCacheProvider()
const createPostUseCase = new CreatePostUseCase(
  postRepository
)
const getTimelineUseCase = new GetTimelineUseCase(
  userRepository,
  postRepository,
  cacheProvider
)

const postController = new PostController(createPostUseCase, getTimelineUseCase)

router.post('/', (req, res) => postController.create(req, res))
router.get('/timeline/:userId', (req, res) => postController.timeline(req, res))

export default router
