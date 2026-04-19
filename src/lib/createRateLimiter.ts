import { Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { ioredis } from "./redis";

function toUpstashDuration(seconds: number): Duration {
  if (seconds < 60) return `${seconds} s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} m`;
  return `${Math.floor(seconds / 3600)} h`;
}

export function createRateLimiter(points: number, duration: number) {
  if (process.env.REDIS_PROVIDER === "upstash") {
    const limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.fixedWindow(points, toUpstashDuration(duration)),
    });

    return {
      async check(key: string) {
        const res = await limiter.limit(key);
        return {
          success: res.success,
          remaining: res.remaining,
        };
      },
    };
  }

  const limiter = new RateLimiterRedis({
    storeClient: ioredis!,
    keyPrefix: "rl",
    points,
    duration,
  });

  return {
    async check(key: string) {
      try {
        const res = await limiter.consume(key);
        return {
          success: true,
          remaining: res.remainingPoints,
        };
      } catch {
        return {
          success: false,
          remaining: 0,
        };
      }
    },
  };
}
