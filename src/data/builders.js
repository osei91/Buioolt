// Reference figures for "what AI builders tend to cost once you're in production."
// These are reasonable public-pricing ballparks, not live quotes — the calculator
// is directional, meant to show the shape of lock-in cost, not an invoice.
export const BUILDERS = [
  {
    id: 'bolt',
    name: 'Bolt.new',
    monthlyLockIn: 50,
    note: 'Token-metered builds plus StackBlitz hosting once you outgrow the free tier.',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    monthlyLockIn: 50,
    note: 'Credit-based plans scale fast once a project needs daily edits.',
  },
  {
    id: 'replit',
    name: 'Replit',
    monthlyLockIn: 35,
    note: 'Core + compute add-ons for anything running beyond a demo.',
  },
  {
    id: 'v0',
    name: 'v0 (Vercel)',
    monthlyLockIn: 30,
    note: 'Usage-based generation credits on top of Vercel hosting.',
  },
  {
    id: 'aistudio',
    name: 'Google AI Studio',
    monthlyLockIn: 32,
    note: 'Cheap to prototype in, but production traffic moves you to paid API tiers.',
  },
  {
    id: 'base44',
    name: 'Base44',
    monthlyLockIn: 40,
    note: 'All-in-one pricing that bundles hosting, auth and database together.',
  },
  {
    id: 'other',
    name: 'Another AI builder',
    monthlyLockIn: 40,
    note: 'Most platform-bundled builders land in a similar range.',
  },
]

export const STATUS_OPTIONS = [
  { id: 'idea', label: 'Just an idea' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'development', label: 'In development' },
  { id: 'production', label: 'Live in production' },
]

// Rough self-hosting cost once migrated off the builder: a small VPS,
// a managed database, and basic monitoring. Stays roughly flat regardless
// of how the app was originally built.
export const SELF_HOST_MONTHLY = 7

// One-time migration estimate, used to build the "year one" comparison.
export const MIGRATION_FLAT_FEE = 250
