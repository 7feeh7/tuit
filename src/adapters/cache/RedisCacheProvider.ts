import { redisClient } from '@config/redis'
import { ICacheProvider } from '@domain/ports/ICacheProvider'

export class RedisCacheProvider implements ICacheProvider {
  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  }

  async set<T>(key: string, value: T, ttl = 30): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), { EX: ttl })
  }

  async del(key: string): Promise<void> {
    await redisClient.del(key)
  }
}
