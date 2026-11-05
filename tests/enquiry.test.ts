import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cleanText, escapeHtml, parseEnquiry, validate } from '../src/lib/enquiry.ts'

const good = { type: 'contact', firstName: 'Ana', lastName: 'Lee', phone: '0412 345 678', email: 'ana@example.com', message: 'Hello', consent: 'yes', page: '/contact/' }

test('accepts a valid contact enquiry', () => {
  const r = parseEnquiry(good)
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.bot, false)
    assert.equal(r.enquiry.fields.firstName, 'Ana')
  }
})

test('rejects non-objects, arrays and unknown form types', () => {
  for (const b of [null, 'x', 42, [], { ...good, type: 'admin' }]) assert.equal(parseEnquiry(b).ok, false)
})

test('rejects non-string field values (type confusion)', () => {
  const r = parseEnquiry({ ...good, firstName: { $ne: '' } })
  assert.equal(r.ok, false)
})

test('drops unknown fields', () => {
  const r = parseEnquiry({ ...good, isAdmin: 'true', __proto__: { polluted: 1 } })
  assert.equal(r.ok, true)
  if (r.ok) assert.deepEqual(Object.keys(r.enquiry.fields).sort(), ['consent', 'email', 'firstName', 'lastName', 'message', 'phone'])
})

test('requires consent, email and message for contact', () => {
  const e = validate({ firstName: 'A', lastName: 'B', phone: '0412345678' }, 'contact')
  assert.ok(e.email && e.message && e.consent)
})

test('referral needs an organisation; booking email is optional', () => {
  assert.ok(validate({ ...good, organisation: '' }, 'referral').organisation)
  const b = validate({ firstName: 'A', lastName: 'B', phone: '0412345678', consent: 'yes' }, 'book')
  assert.deepEqual(b, {})
})

test('only accepts listed services and regions', () => {
  assert.ok(validate({ ...good, service: '<script>' }, 'contact').service)
  assert.ok(validate({ ...good, region: 'Mars' }, 'contact').region)
  assert.deepEqual(validate({ ...good, service: 'Podiatry', region: 'Victoria' }, 'contact'), {})
})

test('checks phone, email and NDIS number formats', () => {
  assert.ok(validate({ ...good, phone: '12' }, 'contact').phone)
  assert.ok(validate({ ...good, phone: '0412 javascript:' }, 'contact').phone)
  assert.ok(validate({ ...good, email: 'a@b' }, 'contact').email)
  assert.ok(validate({ ...good, email: 'x@y.com\r\nBcc: z@q.com' }, 'contact').email)
  assert.ok(validate({ ...good, ndisNumber: '12345' }, 'contact').ndisNumber)
  assert.deepEqual(validate({ ...good, ndisNumber: '430 123 456' }, 'contact'), {})
})

test('enforces maximum lengths', () => {
  const r = parseEnquiry({ ...good, message: 'x'.repeat(2500) })
  assert.equal(r.ok, false)
  const huge = parseEnquiry({ ...good, firstName: 'x'.repeat(10_000) })
  assert.equal(huge.ok, false)
})

test('strips control and invisible characters (header injection, bidi tricks)', () => {
  assert.equal(cleanText('Ana\r\nBcc: evil@x.com'), 'Ana Bcc: evil@x.com')
  assert.equal(cleanText('a‮b​c'), 'a b c'.replace(/ /g, ' ').replace('a b c', 'a b c'))
  assert.equal(cleanText('line1\r\nline2\n\n\n\nline3', true), 'line1\nline2\n\nline3')
})

test('flags the honeypot as a bot', () => {
  const r = parseEnquiry({ ...good, website: 'http://spam' })
  assert.equal(r.ok && r.bot, true)
})

test('ignores an unsafe page path', () => {
  const r = parseEnquiry({ ...good, page: 'javascript:alert(1)' })
  assert.equal(r.ok && r.enquiry.page, '/')
})

test('escapes HTML for email bodies', () => {
  assert.equal(escapeHtml(`<img src=x onerror="a">&'`), '&lt;img src=x onerror=&quot;a&quot;&gt;&amp;&#39;')
})
