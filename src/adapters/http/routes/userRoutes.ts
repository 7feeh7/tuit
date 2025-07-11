import { Router } from 'express'
import { UserRepositoryMongo } from '@adapters/database/UserRepositoryMongo'
import { CreateUserUseCase } from '@domain/usecases/CreateUser/CreateUserUseCase'
import { UserController } from '@adapters/http/controllers/UserController'
import { FollowUserUseCase } from '@domain/usecases/FollowUser/FollowUserUseCase'
import { ListUsersUseCase } from '@domain/usecases/ListUsers/ListUsersUseCase'
import { BcryptHashProvider } from '@adapters/providers/BcryptHashProvider'

const router = Router()

const userRepository = new UserRepositoryMongo()
const hashProvider = new BcryptHashProvider()

const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider)
const followUserUseCase = new FollowUserUseCase(userRepository)
const listUsersUseCase = new ListUsersUseCase(userRepository)

const userController = new UserController(
  createUserUseCase,
  followUserUseCase,
  listUsersUseCase
)

router.post('/', (req, res) => userController.create(req, res))
router.post('/follow', (req, res) => userController.follow(req, res))
router.get('/', (req, res) => userController.list(req, res))

export default router
