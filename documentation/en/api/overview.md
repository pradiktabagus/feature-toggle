# 🔌 API Overview

This document provides a comprehensive overview of the Feature Toggle Management System API architecture, conventions, and usage patterns.

## 🏗️ API Architecture

### API Structure
```
/api/
├── auth/                   # Authentication endpoints
│   └── [...nextauth]/      # NextAuth.js OAuth handlers
├── toggles/                # Toggle management (admin)
│   ├── route.ts           # GET, POST /api/toggles
│   └── [id]/              # PUT, PATCH, DELETE /api/toggles/[id]
├── public/                 # Public consumption API
│   └── toggles/           # GET /api/public/toggles/[key]
├── files/                  # File upload endpoints
│   └── route.ts           # POST /api/files
└── cdn/                    # CDN redirect endpoints
    └── toggles/           # GET /api/cdn/toggles/[key]
```

### API Layers
```
Client → API Route → Business Logic → Database
                  ↓
               Cache Layer (S3 + CloudFront)
```

## 🔐 Authentication

### Authentication Methods
- **Admin API**: NextAuth.js session-based authentication
- **Public API**: No authentication required
- **File Upload**: Session-based authentication

### Session Management
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Authenticated logic
}
```

### Protected Routes
All admin endpoints require authentication:
- `/api/toggles/*` - Toggle management
- `/api/files/*` - File operations

## 📊 Response Format

### Standard Response Structure
```typescript
interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: {
    code: string
    details?: string
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### Success Response Example
```json
{
  "success": true,
  "message": "Toggles retrieved successfully",
  "data": [
    {
      "id": "toggle-123",
      "name": "New Checkout Flow",
      "key": "new-checkout-flow-abc123",
      "value": true,
      "type": "BOOLEAN",
      "isActive": true,
      "createdAt": "2025-01-17T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "Failed to create toggle",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Name is required"
  }
}
```

## 🎛️ Toggle Management API

### List Toggles
```http
GET /api/toggles?page=1&limit=10
Authorization: Session-based
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "toggle-123",
      "name": "Feature Name",
      "description": "Feature description",
      "key": "feature-key-abc123",
      "value": true,
      "type": "BOOLEAN",
      "isActive": true,
      "createdAt": "2025-01-17T10:00:00Z",
      "updatedAt": "2025-01-17T10:30:00Z",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Create Toggle
```http
POST /api/toggles
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Feature",
  "description": "Description of the feature",
  "value": true,
  "type": "BOOLEAN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Toggle created successfully",
  "data": {
    "id": "toggle-456",
    "name": "New Feature",
    "key": "new-feature-def456",
    "value": true,
    "type": "BOOLEAN",
    "isActive": true
  }
}
```

### Update Toggle
```http
PUT /api/toggles/[id]
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Feature Name",
  "description": "Updated description",
  "value": false,
  "type": "BOOLEAN"
}
```

### Update Toggle Status
```http
PATCH /api/toggles/[id]
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "isActive": false
}
```

### Delete Toggle
```http
DELETE /api/toggles/[id]
Authorization: Session-based
```

## 🌐 Public API

### Get Toggle by Key
```http
GET /api/public/toggles/[key]
```

**Response (Toggle Found):**
```json
{
  "enabled": true,
  "key": "new-checkout-flow",
  "name": "New Checkout Flow",
  "value": true,
  "type": "BOOLEAN"
}
```

**Response (Toggle Not Found):**
```json
{
  "enabled": false,
  "value": null,
  "message": "Toggle not found or inactive"
}
```

### List All Public Toggles
```http
GET /api/public/toggles
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "enabled": true,
      "key": "feature-a",
      "name": "Feature A",
      "value": true,
      "type": "BOOLEAN"
    },
    {
      "enabled": true,
      "key": "feature-b", 
      "name": "Feature B",
      "value": "production",
      "type": "STRING"
    }
  ]
}
```

## 🚀 Caching & Performance

### Cache Headers
All public API responses include cache headers:

```http
Cache-Control: public, max-age=300, s-maxage=3600
CDN-Cache-Control: max-age=3600
X-Cache-Source: S3-Cache | Database
X-Cache-Status: HIT | MISS
X-CloudFront-Hit: true | false
X-CloudFront-Cache: HIT | MISS | UNKNOWN
```

### Cache Configuration
```typescript
// Configurable via environment variables
const BROWSER_CACHE = parseInt(process.env.BROWSER_CACHE_SECONDS || '300')    // 5 minutes
const CLOUDFRONT_CACHE = parseInt(process.env.CLOUDFRONT_CACHE_SECONDS || '3600') // 1 hour
```

### Cache Invalidation
Cache is automatically invalidated on:
- Toggle creation
- Toggle updates
- Toggle deletion
- Toggle status changes

## 📁 File Upload API

### Upload File
```http
POST /api/files
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "file content as string",
  "filename": "backup.json"
}
```

**Response:**
```json
{
  "key": "toggles/uuid-backup.json",
  "url": "https://cloudfront-domain.com/toggles/uuid-backup.json",
  "message": "File uploaded successfully"
}
```

## 🔄 CDN Redirect API

### Get CloudFront URL
```http
GET /api/cdn/toggles/[key]
```

**Response:**
```http
HTTP/1.1 302 Found
Location: https://cloudfront-domain.com/public/toggles/[key].json
```

## ⚡ Performance Optimization

### Response Times
- **Cached Requests**: <50ms (CloudFront)
- **Origin Requests**: <200ms (Database)
- **Cache Miss**: <300ms (Database + Cache Update)

### Rate Limiting
- **Public API**: Rate limited via CloudFront
- **Admin API**: Session-based throttling
- **File Upload**: Size and frequency limits

### Monitoring Headers
```http
X-Response-Time: 45ms
X-Cache-Hit-Rate: 85%
X-Database-Query-Time: 12ms
X-Cache-Update-Time: 8ms
```

## 🛡️ Security

### Input Validation
All endpoints use Zod schemas for validation:

```typescript
import { z } from 'zod'

const createToggleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  value: z.unknown(),
  type: z.enum(['BOOLEAN', 'STRING', 'NUMBER', 'JSON'])
})
```

### Error Handling
```typescript
try {
  // API logic
} catch (error) {
  console.error('API Error:', error)
  
  if (error instanceof z.ZodError) {
    return NextResponse.json({
      success: false,
      message: 'Validation error',
      error: {
        code: 'VALIDATION_ERROR',
        details: error.errors[0].message
      }
    }, { status: 400 })
  }
  
  return NextResponse.json({
    success: false,
    message: 'Internal server error',
    error: { code: 'INTERNAL_ERROR' }
  }, { status: 500 })
}
```

### CORS Configuration
```typescript
// Next.js handles CORS automatically
// Custom CORS for specific endpoints if needed
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
```

## 📊 API Usage Examples

### JavaScript/TypeScript Client
```typescript
class ToggleClient {
  private baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  
  async getToggle(key: string) {
    const response = await fetch(`${this.baseUrl}/api/public/toggles/${key}`)
    return response.json()
  }
  
  async isEnabled(key: string): Promise<boolean> {
    const toggle = await this.getToggle(key)
    return toggle.enabled && toggle.value === true
  }
}

// Usage
const client = new ToggleClient('https://your-domain.com')
const isNewFeatureEnabled = await client.isEnabled('new-feature')
```

### React Hook
```typescript
import { useState, useEffect } from 'react'

export function useToggle(key: string) {
  const [toggle, setToggle] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch(`/api/public/toggles/${key}`)
      .then(res => res.json())
      .then(data => {
        setToggle(data)
        setLoading(false)
      })
  }, [key])
  
  return { 
    enabled: toggle?.enabled || false,
    value: toggle?.value,
    loading 
  }
}

// Usage in component
function FeatureComponent() {
  const { enabled, loading } = useToggle('new-feature')
  
  if (loading) return <Loading />
  
  return enabled ? <NewFeature /> : <OldFeature />
}
```

### cURL Examples
```bash
# Get toggle
curl -X GET "https://your-domain.com/api/public/toggles/feature-key"

# Create toggle (requires authentication)
curl -X POST "https://your-domain.com/api/toggles" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "name": "New Feature",
    "value": true,
    "type": "BOOLEAN"
  }'

# Update toggle status
curl -X PATCH "https://your-domain.com/api/toggles/toggle-id" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"isActive": false}'
```

## 🔍 Debugging & Monitoring

### Debug Headers
Enable debug mode to get additional headers:
```http
X-Debug-Mode: true
X-Execution-Time: 45ms
X-Database-Queries: 3
X-Cache-Operations: 1
X-Memory-Usage: 12MB
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-17T10:00:00Z",
  "services": {
    "database": "connected",
    "cache": "operational",
    "cloudfront": "active"
  }
}
```

## 📚 Related Documentation

- [Toggle API Details](./toggle-api.md)
- [Public API Guide](./public-api.md)
- [Cache API Reference](./cache-api.md)
- [Core Features](../features/core-features.md)
- [Caching System](../features/caching-system.md)