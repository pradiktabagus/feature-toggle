'use client'

import { create } from 'zustand'

interface ToggleModalStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useToggleModal = create<ToggleModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))