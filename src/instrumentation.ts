// Next.js calls onRequestError for every uncaught server error (pages, route handlers,
// server actions). It is logged as one JSON line for the host's log drain. To forward
// errors to a monitoring service such as Sentry, call it here (see docs/DEPLOYMENT.md).

export async function onRequestError(
  err: unknown,
  request: { path: string; method: string },
  context: { routePath: string; routeType: string },
) {
  const e = err as { message?: string; digest?: string }
  console.error(JSON.stringify({
    level: 'error',
    event: 'request.error',
    time: new Date().toISOString(),
    method: request.method,
    // Path only; no query string, which could carry personal details.
    path: request.path.split('?')[0],
    route: context.routePath,
    routeType: context.routeType,
    message: e?.message ?? String(err),
    digest: e?.digest,
  }))
}
