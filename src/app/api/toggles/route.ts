/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/shared/lib/prisma'
import { CreateToggleRequest } from '@/shared/api'
import { v4 as uuidv4 } from 'uuid'
import { ApiResponse } from '@/shared/types/api-response'


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [rawToggles, total] = await Promise.all([
      prisma.toggle.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.toggle.count()
    ])

    // Add updatedByUser data manually
    const toggles = await Promise.all(
      rawToggles.map(async (toggle) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const toggleWithUpdatedBy = toggle as any
        let updatedByUser = null
        if (toggleWithUpdatedBy.updatedBy) {
          updatedByUser = await prisma.user.findUnique({
            where: { id: toggleWithUpdatedBy.updatedBy },
            select: { name: true, email: true }
          })
        }
        return {
          ...toggle,
          updatedBy: toggleWithUpdatedBy.updatedBy,
          updatedByUser
        }
      })
    )

    const response: ApiResponse = {
      success: true,
      message: 'Toggles retrieved successfully',
      data: toggles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Failed to fetch toggles',
      error: {
        code: 'FETCH_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found',
        error: {
          code: 'USER_NOT_FOUND'
        }
      }
      return NextResponse.json(response, { status: 404 })
    }

    const data: CreateToggleRequest = await request.json()

    const toggle = await prisma.toggle.create({
      data: {
        name: data.name,
        description: data.description,
        value: data.value,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: data.type as any,
        key: `${data.name.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().slice(0, 8)}-${Date.now()}`,
        createdBy: user.id,
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
    
    // Set updatedBy same as createdBy for new toggle
    await prisma.toggle.updateMany({
      where: { id: toggle.id },
      data: { updatedBy: user.id } as any
    })

    // Sync to cache
    const { syncToggleToCache } = await import('@/entities/cache')
    syncToggleToCache(toggle.key).catch(console.error)

    // Auto export to S3
    const { autoExportToggles } = await import('@/entities/export')
    autoExportToggles(session.user.email).catch(console.error)

    const response: ApiResponse = {
      success: true,
      message: 'Toggle created successfully',
      data: toggle
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Create toggle error:', error)
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create toggle',
      error: {
        code: 'CREATE_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}