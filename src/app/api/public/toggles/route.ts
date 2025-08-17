import { NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export async function GET() {
  try {
    const toggles = await prisma.toggle.findMany({
      where: { isActive: true },
      select: {
        key: true,
        name: true,
        type: true,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      count: toggles.length,
      toggles: toggles
    })
  } catch (error) {
    console.error('List toggles error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to list toggles'
    }, { status: 500 })
  }
}