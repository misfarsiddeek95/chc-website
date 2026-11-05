// Structured JSON logs (one line per event) for the hosting platform's log drain.
// Never log form contents: they are personal and health information.

type Level = 'info' | 'warn' | 'error'

export function log(level: Level, event: string, data: Record<string, unknown> = {}) {
  const line = JSON.stringify({ level, event, time: new Date().toISOString(), ...data })
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

/** A short, non-reversible tag for an IP address, so logs can show repeat senders without storing IPs. */
export async function ipTag(ip: string): Promise<string> {
  const salt = process.env.LOG_SALT ?? 'chc'
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ip))
  return Array.from(new Uint8Array(digest).slice(0, 6), b => b.toString(16).padStart(2, '0')).join('')
}
