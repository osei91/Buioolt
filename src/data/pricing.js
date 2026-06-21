export const PRICING_TIERS = [
  {
    id: 'essential',
    name: 'Essential',
    price: 25,
    audience: 'For apps in development or still a prototype.',
    features: [
      'Database schema extraction',
      'Core API / backend re-write',
      'Proprietary hook removal',
      'Standard stack export',
      'Basic deployment templates',
    ],
    highlight: false,
  },
  {
    id: 'production',
    name: 'Production Secure',
    price: 195,
    audience: 'For live apps with active users and real data.',
    features: [
      'Everything in Essential',
      'Live database data migration',
      'Auth system provider sync',
      'Full production environment setup',
      'CI/CD deployment pipeline',
      'Zero-downtime strategy',
    ],
    highlight: true,
  },
]
