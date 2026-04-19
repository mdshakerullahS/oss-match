import { redis } from "@/lib/redis";

export const CACHE_TTL = {
  issues: 300,
  bookmarks: 120,
  profile: 600,
};

export async function getCached<T>(key: string) {
  return redis.get<T>(key);
}

export async function setCached<T>(key: string, data: T, ttl: number) {
  return redis.set(key, data, ttl);
}

export async function invalidateCache(key: string) {
  return redis.del(key);
}

export function buildCacheKey(prefix: string, params: URLSearchParams) {
  const sorted = new URLSearchParams(params);
  sorted.sort();

  return `${prefix}:${sorted.toString() || "all"}`;
}
