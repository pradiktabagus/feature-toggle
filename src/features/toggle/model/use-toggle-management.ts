import { useState } from 'react'
import { useToggleModal } from './use-toggle-modal'
import { useToggleActions } from './use-toggle-actions'
import { ToggleData } from './types'
import { CreateToggleRequest } from '@/shared/api'

export const useToggleManagement = () => {
  const { isOpen, openModal, closeModal } = useToggleModal()
  const [editData, setEditData] = useState<ToggleData | undefined>()
  const [isEditOpen, setIsEditOpen] = useState(false)
  
  const { handleCreate, handleUpdate, handleDuplicate, handleDelete } = useToggleActions(closeModal)

  const handleSubmit = (data: CreateToggleRequest) => {
    handleCreate(data)
  }

  const handleEdit = (data: ToggleData) => {
    setEditData(data)
    setIsEditOpen(true)
  }

  const handleEditSubmit = (data: CreateToggleRequest) => {
    if (!editData?.id) return
    handleUpdate(editData.id, data)
    handleEditClose()
  }

  const handleEditClose = () => {
    setIsEditOpen(false)
    setEditData(undefined)
  }

  return {
    // Create modal
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
    
    // Edit modal
    editData,
    isEditOpen,
    handleEdit,
    handleEditSubmit,
    handleEditClose,
    
    // Table actions
    handleDuplicate,
    handleDelete,
  }
}