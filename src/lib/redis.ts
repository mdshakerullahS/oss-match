import { Redis as UpstashRedis } from "@upstash/redis";
import Redis from "ioredis";

const isUpstash = process.env.REDIS_PROVIDER === "upstash";

const upstash = isUpstash
  ? new UpstashRedis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export const ioredis = !isUpstash
  ? new Redis({ host: "redis", port: 6379 })
  : null;

export const redis = {
  async get<T>(key: string): Promise<T | null | void> {
    try {
      if (upstash) return await upstash.get<T>(key);
      const data = await ioredis!.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Redis GET error:", error);
    }
  },

  async set<T>(
    key: string,
    value: T,
    exSeconds: number = 300,
  ): Promise<T | "OK" | null | void> {
    try {
      if (upstash) {
        return await upstash.set(key, value, { ex: exSeconds });
      }

      const stringValue = JSON.stringify(value);
      return await ioredis!.set(key, stringValue, "EX", exSeconds);
    } catch (error) {
      console.error("Redis SET error:", error);
    }
  },

  async del(key: string): Promise<number | void> {
    try {
      if (upstash) return await upstash.del(key);

      if (!ioredis) throw new Error("Redis not initialized");

      return await ioredis.del(key);
    } catch (error) {
      console.error("Redis DEL error:", error);
    }
  },
};
