import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

export const dynamic = 'force-static'

// Everyone may crawl everything except the form endpoint. AI crawlers are named
// explicitly so the decision is on record: CHC wants to be cited by AI answer
// engines (ChatGPT, Perplexity, Gemini / Google AI Overviews, Claude, Copilot).
// To opt out of AI training or answers, change a line below to disallow: '/'.
const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Google-Extended', 'ClaudeBot', 'Claude-SearchBot', 'Applebot-Extended', 'CCBot', 'Bingbot']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: aiCrawlers, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
