import { api } from '@/shared/api'
import type { ApiResponse } from '@/shared/types/api-response'
import type { Rollout, CreateRolloutRequest, UpdateRolloutRequest, RolloutWithToggle } from '../model/rollout'

export const rolloutApi = {
  getAll: (): Promise<ApiResponse<Rollout[]>> => 
    api.get('/api/rollouts'),

  getById: (id: string): Promise<ApiResponse<RolloutWithToggle>> => 
    api.get(`/api/rollouts/${id}`),

  getByToggleId: (toggleId: string): Promise<ApiResponse<Rollout[]>> => 
    api.get(`/api/rollouts/toggle/${toggleId}`),

  create: (data: CreateRolloutRequest): Promise<ApiResponse<Rollout>> => 
    api.post('/api/rollouts', data),

  update: (id: string, data: UpdateRolloutRequest): Promise<ApiResponse<Rollout>> => 
    api.put(`/api/rollouts/${id}`, data),

  updatePercentage: (id: string, percentage: number): Promise<ApiResponse<Rollout>> => 
    api.patch(`/api/rollouts/${id}/percentage`, { percentage }),

  delete: (id: string): Promise<ApiResponse<void>> => 
    api.delete(`/api/rollouts/${id}`)
}