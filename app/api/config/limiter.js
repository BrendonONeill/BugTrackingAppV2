import {RateLimiter} from 'limiter'


export const limiter = new RateLimiter({
    tokensPerInterval: 120,
    interval: "hour",
    fireImmediately: true
})