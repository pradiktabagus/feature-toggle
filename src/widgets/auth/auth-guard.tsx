'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoginWidget } from './login-widget'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/dashboard' }: AuthGuardProps) {
  const { isLoading, isAuthenticated } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/') {
      router.push(redirectTo)
    }
  }, [isAuthenticated, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginWidget />
  }

  return <>{children}</>
}