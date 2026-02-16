import { createClient, RedisClientType } from 'redis';

class Redis {
  private static instance: RedisClientType;

  private constructor() {}

  public static getInstance(): RedisClientType {
    if (!Redis.instance) {
      Redis.instance = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });
      Redis.instance.connect();
    }
    return Redis.instance;
  }
}

export default Redis;
