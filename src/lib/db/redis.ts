import { Redis } from "@upstash/redis";

export const RedisRW = Redis.fromEnv();
export const RedisRO = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_READONLY_TOKEN,
});