'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: 'This email address is already associated with another account. Please sign in using the same method you used before (Google or GitHub).',
        }
      case 'OAuthCallback':
        return {
          title: 'OAuth Error',
          message: 'There was an error with the OAuth provider. Please try again.',
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication. Please try again.',
        }
    }
  }

  const { title, message } = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/signin">
              Try Again
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}