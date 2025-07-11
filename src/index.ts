import dotenv from 'dotenv'
import app from './config/app'
import { connectMongoDB } from './config/mongo'
import { connectRedis } from './config/redis'

dotenv.config()

const PORT = process.env.PORT || 3000

async function main() {
  await connectMongoDB()
  await connectRedis()
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

main()
