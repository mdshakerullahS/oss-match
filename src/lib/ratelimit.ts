import { createRateLimiter } from "@/lib/createRateLimiter";
import { headers } from "next/headers";

export class RateLimitError extends Error {
  statusCode = 429;

  constructor() {
    super("Rate limit exceeded");
  }
}

export async function applyRateLimit(
  keyPrefix: string,
  points: number,
  duration: number,
) {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const key = `${keyPrefix}:${ip}`;

  const limiter = createRateLimiter(points, duration);

  const result = await limiter.check(key);

  if (!result.success) {
    throw new RateLimitError();
  }

  return result;
}
