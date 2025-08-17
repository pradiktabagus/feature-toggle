import { prisma } from '@/shared/lib/prisma'
import { uploadToggleFile } from '@/shared/lib/s3'

export async function autoExportToggles(userEmail: string) {
  try {
    // Get all toggles
    const toggles = await prisma.toggle.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    // Create export data
    const exportData = {
      exportedAt: new Date().toISOString(),
      exportedBy: userEmail,
      toggles: toggles.map((toggle) => ({
        name: toggle.name,
        description: toggle.description,
        value: toggle.value,
        type: toggle.type,
        isActive: toggle.isActive,
        key: toggle.key
      }))
    }

    // Upload to S3 with fixed filename for auto-sync
    const fileName = 'toggles-auto-backup.json'
    await uploadToggleFile(fileName, JSON.stringify(exportData, null, 2))
    
    console.log('Auto export completed:', fileName)
  } catch (error) {
    console.error('Auto export failed:', error)
  }
}