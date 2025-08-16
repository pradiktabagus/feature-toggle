import { z } from 'zod'

export const createToggleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  value: z.string().min(1, 'Value is required'),
  type: z.enum(['STRING', 'NUMBER', 'BOOLEAN', 'JSON']),
}).refine((data) => {
  // For Boolean type, 'false' is a valid value
  if (data.type === 'BOOLEAN') {
    return data.value === 'true' || data.value === 'false'
  }
  return true
}, {
  message: 'Invalid value for Boolean type',
  path: ['value']
})