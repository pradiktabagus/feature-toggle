// Pure business entity - no API calls, just business logic
export interface Toggle {
  id: string
  key: string
  name: string
  description: string | null
  value: string | number | boolean | object
  type: 'String' | 'Number' | 'Boolean' | 'JSON'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export const toggleHelpers = {
  isValidJSON: (value: string): boolean => {
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  },
  
  formatValue: (toggle: Toggle): string => {
    if (toggle.type === 'JSON') {
      return JSON.stringify(toggle.value, null, 2)
    }
    return String(toggle.value)
  },
  
  isActive: (toggle: Toggle): boolean => {
    return toggle.isActive
  }
}