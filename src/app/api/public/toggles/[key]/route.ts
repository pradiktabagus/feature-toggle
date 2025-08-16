import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  try {
    const toggle = await prisma.toggle.findFirst({
      where: { 
        key: key,
        isActive: true // Only return active toggles
      },
      select: {
        key: true,
        name: true,
        value: true,
        type: true,
        isActive: true
      }
    })

    if (!toggle) {
      return NextResponse.json({
        enabled: false,
        value: null,
        message: 'Toggle not found or inactive'
      }, { status: 404 })
    }

    // Parse value based on type
    let parsedValue = toggle.value
    try {
      const valueStr = String(toggle.value)
      if (toggle.type === 'JSON') {
        parsedValue = JSON.parse(valueStr)
      } else if (toggle.type === 'BOOLEAN') {
        parsedValue = valueStr === 'true' || toggle.value === true
      } else if (toggle.type === 'NUMBER') {
        parsedValue = Number(valueStr)
      }
    } catch (error) {
      console.error('Failed to parse toggle value:', error)
    }

    return NextResponse.json({
      enabled: true,
      key: toggle.key,
      name: toggle.name,
      value: parsedValue,
      type: toggle.type
    })
  } catch (error) {
    console.error('Public API error:', error)
    return NextResponse.json({
      enabled: false,
      value: null,
      message: 'Internal server error'
    }, { status: 500 })
  }
}