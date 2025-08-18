import { useState, useEffect } from 'react'
import { rolloutApi } from '../api/rollout-api'
import type { Rollout, CreateRolloutRequest, UpdateRolloutRequest } from './rollout'

export function useRollout() {
  const [rollouts, setRollouts] = useState<Rollout[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRollouts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolloutApi.getAll()
      setRollouts(response.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rollouts')
    } finally {
      setLoading(false)
    }
  }

  const createRollout = async (data: CreateRolloutRequest) => {
    try {
      setError(null)
      const response = await rolloutApi.create(data)
      if (response.success) {
        await fetchRollouts()
        return response.data
      }
      throw new Error(response.message || 'Failed to create rollout')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create rollout'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateRollout = async (id: string, data: UpdateRolloutRequest) => {
    try {
      setError(null)
      const response = await rolloutApi.update(id, data)
      if (response.success) {
        await fetchRollouts()
        return response.data
      }
      throw new Error(response.message || 'Failed to update rollout')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update rollout'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const deleteRollout = async (id: string) => {
    try {
      setError(null)
      const response = await rolloutApi.delete(id)
      if (response.success) {
        await fetchRollouts()
        return true
      }
      throw new Error(response.message || 'Failed to delete rollout')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete rollout'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    fetchRollouts()
  }, [])

  return {
    rollouts,
    loading,
    error,
    createRollout,
    updateRollout,
    deleteRollout,
    refetch: fetchRollouts
  }
}