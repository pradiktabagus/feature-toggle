'use client'

import { useSearchParams } from 'next/navigation'
import { LoginWidget } from '@/widgets/auth/login-widget'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'
  const error = searchParams?.get('error')

  return <LoginWidget callbackUrl={callbackUrl} error={error} />
}