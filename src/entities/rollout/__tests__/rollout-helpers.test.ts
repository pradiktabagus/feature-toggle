import {
  validatePercentage,
  calculateAffectedUsers,
  isUserInRollout,
  getRolloutStatusColor,
  getRolloutStatusText,
  getNextRolloutStep,
  getPreviousRolloutStep,
  formatRolloutStrategy
} from '../lib/rollout-helpers'

describe('rollout-helpers', () => {
  describe('validatePercentage', () => {
    it('should validate correct percentages', () => {
      expect(validatePercentage(0)).toBe(true)
      expect(validatePercentage(50)).toBe(true)
      expect(validatePercentage(100)).toBe(true)
    })

    it('should reject invalid percentages', () => {
      expect(validatePercentage(-1)).toBe(false)
      expect(validatePercentage(101)).toBe(false)
      expect(validatePercentage(50.5)).toBe(false)
    })
  })

  describe('calculateAffectedUsers', () => {
    it('should calculate affected users correctly', () => {
      expect(calculateAffectedUsers(1000, 25)).toBe(250)
      expect(calculateAffectedUsers(1000, 0)).toBe(0)
      expect(calculateAffectedUsers(1000, 100)).toBe(1000)
    })

    it('should throw error for invalid percentage', () => {
      expect(() => calculateAffectedUsers(1000, -1)).toThrow('Invalid percentage value')
    })
  })

  describe('isUserInRollout', () => {
    it('should return false for 0% rollout', () => {
      expect(isUserInRollout('user123', 0)).toBe(false)
    })

    it('should return true for 100% rollout', () => {
      expect(isUserInRollout('user123', 100)).toBe(true)
    })

    it('should be consistent for same user', () => {
      const result1 = isUserInRollout('user123', 50)
      const result2 = isUserInRollout('user123', 50)
      expect(result1).toBe(result2)
    })
  })

  describe('getRolloutStatusColor', () => {
    it('should return correct colors', () => {
      expect(getRolloutStatusColor(0)).toBe('gray')
      expect(getRolloutStatusColor(20)).toBe('red')
      expect(getRolloutStatusColor(40)).toBe('yellow')
      expect(getRolloutStatusColor(60)).toBe('blue')
      expect(getRolloutStatusColor(100)).toBe('green')
    })
  })

  describe('getRolloutStatusText', () => {
    it('should return correct status text', () => {
      expect(getRolloutStatusText(0, false)).toBe('Inactive')
      expect(getRolloutStatusText(0, true)).toBe('Not Started')
      expect(getRolloutStatusText(50, true)).toBe('50% Rollout')
      expect(getRolloutStatusText(100, true)).toBe('Full Rollout')
    })
  })

  describe('getNextRolloutStep', () => {
    it('should return next rollout step', () => {
      expect(getNextRolloutStep(0)).toBe(10)
      expect(getNextRolloutStep(25)).toBe(50)
      expect(getNextRolloutStep(100)).toBe(100)
    })
  })

  describe('getPreviousRolloutStep', () => {
    it('should return previous rollout step', () => {
      expect(getPreviousRolloutStep(100)).toBe(75)
      expect(getPreviousRolloutStep(50)).toBe(25)
      expect(getPreviousRolloutStep(0)).toBe(0)
    })
  })

  describe('formatRolloutStrategy', () => {
    it('should format strategy names', () => {
      expect(formatRolloutStrategy('PERCENTAGE')).toBe('Percentage-based')
      expect(formatRolloutStrategy('USER_BASED')).toBe('User-based')
      expect(formatRolloutStrategy('GEOGRAPHIC')).toBe('Geographic')
      expect(formatRolloutStrategy('TIME_BASED')).toBe('Time-based')
    })
  })
})