# Security

This site has no logins, accounts, database or payments. Its attack surface is the set of
public pages plus one endpoint, `POST /api/enquiry`, which emails form submissions to the
admin inbox. The protections below are layered. None of them makes the site immune to
attack, and the remaining risks are listed at the end.

## What is in place

### Form endpoint (`src/app/api/enquiry/route.api.ts`)

| Layer | What it does |
|---|---|
| Method and content type | `POST` with `application/json` only. Other methods get 405, and form-encoded posts get 415. Requiring JSON means a cross-site page needs a CORS preflight, which is never granted. |
| CSRF / origin check | `Origin` must be this site (or an `ALLOWED_ORIGINS` entry), and `Sec-Fetch-Site` must be `same-origin` when the browser sends it. There are no cookies or sessions to steal. |
| Size limit | Bodies over 16 KB are refused (413), checked both against `Content-Length` and on the body actually read. |
| Rate limits | 5 requests per IP per 10 minutes, and 200 per hour per server instance. Excess requests get 429 with `Retry-After`. These counters live in memory, so the edge rule below is the main protection. |
| Bot checks | A hidden honeypot field (bots get a fake success and nothing is sent). Cloudflare Turnstile is verified on the server when `TURNSTILE_SECRET_KEY` is set. |
| Validation | `src/lib/enquiry.ts` is shared with the browser, but the server re-runs it on the raw input. Only known fields are kept, and every value must be a string. Lengths, phone, email, NDIS number formats and the service/region lists are all enforced. Unknown fields are dropped, and type-confusion payloads such as `{"$ne": ""}` are rejected. |
| Sanitising | Control characters and invisible or bidi-override characters are stripped, which blocks email header injection. The HTML email escapes every value, and the subject is built only from cleaned names. |
| Secrets | `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are read only on the server. Only `NEXT_PUBLIC_*` values reach the browser, and none of them is secret. |
| Logging | One JSON line per event (`enquiry.sent`, `.invalid`, `.rate_limited`, `.rejected`, `.send_failed`). Form contents are never logged, and IPs are stored only as a salted hash. |
| Errors | Users see generic messages. Detail goes to the server log via `src/instrumentation.ts`. |

SQL injection does not apply because there is no database. If one is added, use
parameterised queries only.

### Pages and headers

All pages are prerendered HTML, and no user input is ever rendered back into a page.
React escapes text by default. The only `dangerouslySetInnerHTML` is the JSON-LD
built from the site's own content.

Headers sent on every response (`next.config.ts`, and `public/_headers` for static hosting):

- `Content-Security-Policy`
  - Scripts from this site only (plus Turnstile when enabled).
  - Frames from youtube-nocookie.com only.
  - `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`.
- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` turns off the camera, microphone, geolocation and FLoC.
- `X-Powered-By` is removed. API responses are `Cache-Control: no-store`.

### Third parties

- YouTube videos load only after the visitor presses play, from the privacy-enhanced domain.
- Fonts are self-hosted.
- Analytics are not installed yet. When they are, update the CSP, the Cookie Policy and the consent banner together.

## What the hosting must provide (infrastructure)

These protections can't be built into the app. Set them up at the CDN (Cloudflare is assumed):

1. **DDoS protection.** Proxy the domain through Cloudflare (orange cloud) so attacks are absorbed at the edge.
2. **Edge rate limiting.** Add a WAF rule such as "POST `/api/enquiry`: 10 requests per minute per IP → block for 10 minutes". This is the real limit, because the in-app limiter is per instance.
3. **WAF managed rules and Bot Fight Mode** on.
4. **HTTPS.** Set SSL/TLS to "Full (strict)", turn on "Always Use HTTPS", and use TLS 1.2 or later. Once every subdomain is HTTPS-only, add `includeSubDomains; preload` to HSTS.
5. **Client IP.** Set `TRUST_PROXY=1` only behind a proxy that overwrites `CF-Connecting-IP` or `X-Forwarded-For`.
6. **Secrets.** Store them in the host's encrypted environment settings, rotate them if anyone leaves, and give the email API key send-only scope.
7. **Email domain.** Set up SPF, DKIM and DMARC for the sending domain in Resend, so enquiries don't land in spam and the domain can't easily be spoofed.
8. **Monitoring.**
   - Ship logs to a log drain.
   - Alert on `enquiry.send_failed`, `enquiry.mailer_missing` and spikes of `enquiry.rate_limited`.
   - Use an uptime check on `/` and a weekly synthetic form test.

## Remaining risks (known, accepted or to address)

- **`'unsafe-inline'` in `script-src`.** Next.js inlines its bootstrap scripts. Removing this needs per-request nonces, which would make every page dynamic and lose the static, cacheable HTML. The risk is low because no user content is rendered into pages.
- **Rate limits are per instance.** A distributed attack can exceed the in-app limits. This is mitigated by the Cloudflare rule and Turnstile.
- **Email is the delivery channel.** Enquiries can include health information and travel by email to the admin inbox. That mailbox needs MFA, and access should be limited to the intake staff. For more sensitive intake (NDIS service agreements), use Zanda's secure forms, as proposed.
- **External forms.** The feedback and complaint forms (Microsoft Forms) and the Zanda forms are outside this app's control.
- **Dev dependencies.** `npm audit` shows a moderate ReDoS advisory in `minimatch`, used only by ESLint at development time. Production dependencies report 0 vulnerabilities (`npm run audit`). Re-run both before every release.
- **No authentication exists.** If staff logins or a client portal are added later, they need a separate design: hashed passwords or SSO, httpOnly + Secure + SameSite cookies, CSRF tokens, and account lockout. Do not bolt them onto this endpoint.
