// Date formatting with a fixed locale and time zone, so the server-rendered HTML
// and the browser always agree.

const fmt = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Brisbane' })
const fmtNoYear = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', timeZone: 'Australia/Brisbane' })

/** "24 December to 4 January 2027". */
export function formatHolidayRange(from: string, to: string): string {
  return `${fmtNoYear.format(new Date(from + 'T00:00:00+10:00'))} to ${fmt.format(new Date(to + 'T00:00:00+10:00'))}`
}
