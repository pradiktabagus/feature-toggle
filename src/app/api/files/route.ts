import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'
import { uploadToggleFile, getPublicUrl } from '@/shared/lib/s3'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, filename } = await request.json()
    
    if (!content || !filename) {
      return NextResponse.json({ error: 'Content and filename are required' }, { status: 400 })
    }

    const key = `toggles/${uuidv4()}-${filename}`
    
    await uploadToggleFile(key, content)
    const publicUrl = getPublicUrl(key)

    return NextResponse.json({ 
      key, 
      url: publicUrl,
      message: 'File uploaded successfully' 
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}