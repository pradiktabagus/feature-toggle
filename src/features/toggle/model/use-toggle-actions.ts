import { useCreateToggle, useUpdateToggle, useDeleteToggle } from '@/entities/toggle'
import { CreateToggleRequest } from '@/shared/api'
import { ToggleData } from './types'

export const useToggleActions = (onCreateSuccess?: () => void) => {
  const createToggleMutation = useCreateToggle(onCreateSuccess)
  const updateToggleMutation = useUpdateToggle()
  const deleteToggleMutation = useDeleteToggle()

  const handleCreate = async (data: CreateToggleRequest) => {
    try {
      await createToggleMutation.mutateAsync(data)
      console.log('Toggle created successfully')
      return true // Indicate success
    } catch (error) {
      console.error('Failed to create toggle:', error)
      throw error
    }
  }

  const handleUpdate = async (id: string, data: CreateToggleRequest) => {
    try {
      await updateToggleMutation.mutateAsync({ id: String(id), data })
      console.log('Toggle updated successfully')
    } catch (error) {
      console.error('Failed to update toggle:', error)
      throw error
    }
  }

  const handleDuplicate = async (toggle: ToggleData) => {
    try {
      const duplicateData: CreateToggleRequest = {
        name: `${toggle.name} (Copy)`,
        description: toggle.description || '',
        value: String(toggle.value),
        type: toggle.type,
      }
      await createToggleMutation.mutateAsync(duplicateData)
      console.log('Toggle duplicated successfully')
    } catch (error) {
      console.error('Failed to duplicate toggle:', error)
      throw error
    }
  }

  const handleDelete = async (toggle: ToggleData) => {
    try {
      await deleteToggleMutation.mutateAsync(String(toggle.id))
      console.log('Toggle deleted successfully')
    } catch (error) {
      console.error('Failed to delete toggle:', error)
      throw error
    }
  }

  return {
    handleCreate,
    handleUpdate,
    handleDuplicate,
    handleDelete,
    isCreating: createToggleMutation.isPending,
    isUpdating: updateToggleMutation.isPending,
    isDeleting: deleteToggleMutation.isPending,
  }
}