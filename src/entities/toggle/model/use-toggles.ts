import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getToggles, createToggle, updateToggle, deleteToggle, CreateToggleRequest } from '@/shared/api'

export const useToggles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['toggles', page, limit],
    queryFn: () => getToggles(page, limit),
  })
}

export const useCreateToggle = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateToggleRequest) => createToggle(data),
    onSuccess: (newToggle) => {
      // Update cache with new toggle
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['toggles'], (oldData: any) => {
        if (!oldData) return [newToggle]
        return [newToggle, ...oldData]
      })
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['toggles'] })
      onSuccess?.()
    },
  })
}

export const useUpdateToggle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateToggleRequest> }) => updateToggle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toggles'] })
    },
  })
}

export const useDeleteToggle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => deleteToggle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toggles'] })
    },
  })
}

export const useUpdateToggleStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => 
      fetch(`/api/toggles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toggles'] })
    },
  })
}