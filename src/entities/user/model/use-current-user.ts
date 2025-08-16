'use client'

import { useSession } from 'next-auth/react'

export function useCurrentUser() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user ? {
      id: session.user.id,
      name: session.user.name || 'User',
      email: session.user.email || 'user@example.com',
      avatar: session.user.image || '/avatars/default.jpg',
      role: session.user.role || 'user',
    } : null,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
  }
}