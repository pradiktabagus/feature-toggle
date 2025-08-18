import type { RolloutStrategy } from '../model/rollout'

export function validatePercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100 && Number.isInteger(percentage)
}

export function calculateAffectedUsers(totalUsers: number, percentage: number): number {
  if (!validatePercentage(percentage)) {
    throw new Error('Invalid percentage value')
  }
  return Math.floor((totalUsers * percentage) / 100)
}

export function isUserInRollout(userId: string, percentage: number): boolean {
  if (!validatePercentage(percentage)) {
    return false
  }
  
  if (percentage === 0) return false
  if (percentage === 100) return true
  
  // Simple hash-based distribution
  const hash = hashString(userId)
  return (hash % 100) < percentage
}

export function getRolloutStatusColor(percentage: number): string {
  if (percentage === 0) return 'gray'
  if (percentage < 25) return 'red'
  if (percentage < 50) return 'yellow'
  if (percentage < 75) return 'blue'
  return 'green'
}

export function getRolloutStatusText(percentage: number, isActive: boolean): string {
  if (!isActive) return 'Inactive'
  if (percentage === 0) return 'Not Started'
  if (percentage === 100) return 'Full Rollout'
  return `${percentage}% Rollout`
}

export function getNextRolloutStep(currentPercentage: number): number {
  const steps = [0, 10, 25, 50, 75, 100]
  const currentIndex = steps.findIndex(step => step >= currentPercentage)
  return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : 100
}

export function getPreviousRolloutStep(currentPercentage: number): number {
  const steps = [0, 10, 25, 50, 75, 100]
  const currentIndex = steps.findIndex(step => step >= currentPercentage)
  return currentIndex > 0 ? steps[currentIndex - 1] : 0
}

export function formatRolloutStrategy(strategy: RolloutStrategy): string {
  const strategyMap: Record<RolloutStrategy, string> = {
    PERCENTAGE: 'Percentage-based',
    USER_BASED: 'User-based',
    GEOGRAPHIC: 'Geographic',
    TIME_BASED: 'Time-based'
  }
  return strategyMap[strategy] || strategy
}

// Simple string hash function for consistent user distribution
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}