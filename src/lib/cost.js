import { SELF_HOST_MONTHLY, MIGRATION_FLAT_FEE } from '../data/builders'

export function yearOneCosts(monthlyLockIn) {
  const stayCost = Math.round(monthlyLockIn * 12)
  const migrateCost = Math.round(MIGRATION_FLAT_FEE + SELF_HOST_MONTHLY * 12)
  const savings = stayCost - migrateCost
  return { stayCost, migrateCost, savings }
}

export function formatUSD(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}
