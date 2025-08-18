export interface Rollout {
  id: string
  toggleId: string
  strategy: RolloutStrategy
  percentage: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy?: string
}

export type RolloutStrategy = 
  | 'PERCENTAGE'
  | 'USER_BASED'
  | 'GEOGRAPHIC'
  | 'TIME_BASED'

export interface CreateRolloutRequest {
  toggleId: string
  strategy: RolloutStrategy
  percentage: number
  isActive?: boolean
}

export type UpdateRolloutRequest = Partial<Omit<CreateRolloutRequest, 'toggleId'>>

export interface RolloutWithToggle extends Rollout {
  toggle: {
    id: string
    name: string
    key: string
    type: string
  }
}