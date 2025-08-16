import { api } from '../axios'

export interface CreateToggleRequest {
  name: string
  description: string
  value: string
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON'
}

export interface ToggleResponse {
  id: string
  key: string
  name: string
  description: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON'
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  user: {
    name: string | null
    email: string | null
  }
}

export async function getToggles(page = 1, limit = 10): Promise<{ data: ToggleResponse[], pagination: { page: number, limit: number, total: number, totalPages: number } }> {
  const response = await api.get(`/toggles?page=${page}&limit=${limit}`)
  return response.data
}

export async function createToggle(data: CreateToggleRequest): Promise<ToggleResponse> {
  const response = await api.post('/toggles', data)
  return response.data
}

export async function updateToggle(id: string, data: Partial<CreateToggleRequest>): Promise<ToggleResponse> {
  const response = await api.put(`/toggles/${id}`, data)
  return response.data
}

export async function deleteToggle(id: string): Promise<void> {
  await api.delete(`/toggles/${id}`)
}