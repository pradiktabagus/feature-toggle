/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/shared/lib/prisma'
import { ApiResponse } from '@/shared/types/api-response'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required',
        error: {
          code: 'UNAUTHORIZED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    const { isActive } = await request.json()
    
    // Get current user ID
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })
    
    const toggle = await prisma.toggle.update({
      where: { id: id },
      data: { 
        isActive,
      } as any,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    
    // Manually update updatedBy field
    if (currentUser?.id) {
      await prisma.toggle.updateMany({
        where: { id: id },
        data: { updatedBy: currentUser.id } as any
      })
    }

    // Auto export to S3
    const { autoExportToggles } = await import('@/shared/lib/auto-export')
    autoExportToggles(session.user.email).catch(console.error)

    // Invalidate cache
    const { cache } = await import('@/shared/lib/cache')
    cache.clear()
    cache.delete(`toggle:${toggle.key}`)

    const response: ApiResponse = {
      success: true,
      message: 'Toggle status updated successfully',
      data: toggle
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Update toggle status error:', error)
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update toggle status',
      error: {
        code: 'UPDATE_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required',
        error: {
          code: 'UNAUTHORIZED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    await prisma.toggle.delete({
      where: { id: id }
    })

    // Auto export to S3
    const { autoExportToggles } = await import('@/shared/lib/auto-export')
    autoExportToggles(session.user.email).catch(console.error)

    // Invalidate cache
    const { cache } = await import('@/shared/lib/cache')
    cache.clear()

    const response: ApiResponse = {
      success: true,
      message: 'Toggle deleted successfully'
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Delete toggle error:', error)
    const response: ApiResponse = {
      success: false,
      message: 'Failed to delete toggle',
      error: {
        code: 'DELETE_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required',
        error: {
          code: 'UNAUTHORIZED'
        }
      }
      return NextResponse.json(response, { status: 401 })
    }

    const data = await request.json()
    
    // Get current user ID
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })
    
    const toggle = await prisma.toggle.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        value: data.value,
        type: data.type,
      } as any,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    
    // Manually update updatedBy field
    if (currentUser?.id) {
      await prisma.toggle.updateMany({
        where: { id: id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { updatedBy: currentUser.id } as any
      })
    }

    // Auto export to S3
    const { autoExportToggles } = await import('@/shared/lib/auto-export')
    autoExportToggles(session.user.email).catch(console.error)

    // Invalidate cache
    const { cache } = await import('@/shared/lib/cache')
    cache.clear()
    cache.delete(`toggle:${toggle.key}`)

    const response: ApiResponse = {
      success: true,
      message: 'Toggle updated successfully',
      data: toggle
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Update toggle error:', error)
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update toggle',
      error: {
        code: 'UPDATE_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}