// Fixed-window rate limiter kept in memory.
//
// Limits are per server instance: on serverless hosting each instance counts
// separately, so this is a second line of defence. The first is an edge rule at
// the CDN (Cloudflare WAF rate limiting on POST /api/enquiry), see docs/SECURITY.md.

type Bucket = { count: number; resetAt: number }

export class RateLimiter {
  private buckets = new Map<string, Bucket>()
  private readonly limit: number
  private readonly windowMs: number
  private readonly maxKeys: number

  constructor(limit: number, windowMs: number, maxKeys = 10_000) {
    this.limit = limit
    this.windowMs = windowMs
    this.maxKeys = maxKeys
  }

  /** Records one hit for `key`; returns whether it is allowed and when the window resets. */
  hit(key: string, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
    let b = this.buckets.get(key)
    if (!b || b.resetAt <= now) {
      if (this.buckets.size >= this.maxKeys) this.sweep(now)
      b = { count: 0, resetAt: now + this.windowMs }
      this.buckets.set(key, b)
    }
    b.count++
    return { allowed: b.count <= this.limit, retryAfterSec: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) }
  }

  private sweep(now: number) {
    for (const [k, b] of this.buckets) if (b.resetAt <= now) this.buckets.delete(k)
    // Still full (a flood of distinct keys): drop the oldest entries.
    if (this.buckets.size >= this.maxKeys) {
      const drop = Math.ceil(this.maxKeys / 10)
      let i = 0
      for (const k of this.buckets.keys()) { if (i++ >= drop) break; this.buckets.delete(k) }
    }
  }
}
