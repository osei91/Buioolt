// Heuristic lock-in scoring. Looks at dependency names for signals that a
// project is wired directly into a specific builder's hosting, database, or
// auth layer, which is what makes self-hosting hard later.

const SIGNALS = [
  { match: /^@replit\//i, weight: 18, label: 'Replit-only packages', tag: 'Replit' },
  { match: /^@lovable\//i, weight: 18, label: 'Lovable-only packages', tag: 'Lovable' },
  { match: /^@stackblitz\//i, weight: 14, label: 'StackBlitz / Bolt runtime packages', tag: 'Bolt' },
  { match: /^@base44\//i, weight: 20, label: 'Base44 platform SDK', tag: 'Base44' },
  { match: /^@vercel\/(?!og|analytics$)/i, weight: 8, label: 'Vercel platform SDKs', tag: 'Vercel' },
  { match: /^firebase(-admin)?$/i, weight: 12, label: 'Firebase as primary backend', tag: 'Firebase' },
  { match: /^@supabase\//i, weight: 6, label: 'Supabase client (portable, but check usage)', tag: 'Supabase' },
  { match: /^convex$/i, weight: 14, label: 'Convex as primary database', tag: 'Convex' },
  { match: /^@clerk\//i, weight: 10, label: 'Clerk-managed auth', tag: 'Clerk' },
  { match: /^@auth0\//i, weight: 8, label: 'Auth0-managed auth', tag: 'Auth0' },
  { match: /^@neondatabase\//i, weight: 4, label: 'Neon Postgres (portable)', tag: 'Neon' },
  { match: /^@planetscale\//i, weight: 4, label: 'PlanetScale (portable)', tag: 'PlanetScale' },
]

const PORTABLE_HINTS = [
  /^express$/i, /^fastify$/i, /^next$/i, /^react$/i, /^vite$/i,
  /^prisma$/i, /^drizzle-orm$/i, /^pg$/i, /^mysql2?$/i, /^sqlite3?$/i,
]

export function analyzePackageJson(rawText) {
  let parsed
  try {
    parsed = JSON.parse(rawText)
  } catch {
    return { error: 'That doesn\u2019t look like valid JSON. Paste the full contents of package.json.' }
  }

  const deps = {
    ...(parsed.dependencies || {}),
    ...(parsed.devDependencies || {}),
  }
  const names = Object.keys(deps)

  if (names.length === 0) {
    return { error: 'No dependencies found in that file.' }
  }

  let score = 8 // baseline: every hosted project has some inherent coupling
  const findings = []
  const tags = new Set()

  names.forEach((name) => {
    SIGNALS.forEach((signal) => {
      if (signal.match.test(name)) {
        score += signal.weight
        tags.add(signal.tag)
        findings.push({ name, label: signal.label, weight: signal.weight })
      }
    })
  })

  const portableCount = names.filter((n) => PORTABLE_HINTS.some((p) => p.test(n))).length
  if (portableCount >= 3) {
    score -= 6
  }

  score = Math.max(2, Math.min(100, Math.round(score)))

  let tier
  if (score < 25) tier = { label: 'Mostly portable', color: 'teal' }
  else if (score < 55) tier = { label: 'Moderately locked in', color: 'amber' }
  else tier = { label: 'Heavily locked in', color: 'amber' }

  return {
    score,
    tier,
    findings,
    tags: Array.from(tags),
    depCount: names.length,
  }
}
