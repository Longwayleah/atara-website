import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function redisCredentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim() ||
    process.env.KV_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  if (!url || !token) return null;
  // KV_URL is redis:// — @upstash/redis needs REST URL
  if (url.startsWith("redis://") || url.startsWith("rediss://")) {
    return null;
  }
  return { url, token };
}

export function getLoyaltyRedis() {
  const creds = redisCredentials();
  if (!creds) return null;

  if (!redis) {
    redis = new Redis({ url: creds.url, token: creds.token });
  }

  return redis;
}

export function isLoyaltyStoreConfigured() {
  return Boolean(redisCredentials());
}
