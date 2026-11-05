import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RateLimiter } from '../src/lib/server/rate-limit.ts'

test('allows up to the limit, then blocks until the window resets', () => {
  const rl = new RateLimiter(2, 1000)
  assert.equal(rl.hit('a', 0).allowed, true)
  assert.equal(rl.hit('a', 10).allowed, true)
  const third = rl.hit('a', 20)
  assert.equal(third.allowed, false)
  assert.equal(third.retryAfterSec, 1)
  assert.equal(rl.hit('b', 20).allowed, true, 'keys are independent')
  assert.equal(rl.hit('a', 1001).allowed, true, 'new window')
})

test('stays bounded under a flood of distinct keys', () => {
  const rl = new RateLimiter(1, 60_000, 100)
  for (let i = 0; i < 1000; i++) rl.hit('k' + i, 0)
  // @ts-expect-error private field, checked for memory safety
  assert.ok(rl.buckets.size <= 100)
})
