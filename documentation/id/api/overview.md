# 🔌 Gambaran Umum API

Dokumen ini memberikan gambaran umum lengkap tentang arsitektur API Sistem Manajemen Feature Toggle, konvensi, dan pola penggunaan.

## 🏗️ Arsitektur API

### Struktur API
```
/api/
├── auth/                   # Endpoint autentikasi
│   └── [...nextauth]/      # Handler OAuth NextAuth.js
├── toggles/                # Manajemen toggle (admin)
│   ├── route.ts           # GET, POST /api/toggles
│   └── [id]/              # PUT, PATCH, DELETE /api/toggles/[id]
├── public/                 # API konsumsi publik
│   └── toggles/           # GET /api/public/toggles/[key]
├── files/                  # Endpoint upload file
│   └── route.ts           # POST /api/files
└── cdn/                    # Endpoint redirect CDN
    └── toggles/           # GET /api/cdn/toggles/[key]
```

### Layer API
```
Client → API Route → Business Logic → Database
                  ↓
               Cache Layer (S3 + CloudFront)
```

## 🔐 Autentikasi

### Metode Autentikasi
- **Admin API**: Autentikasi berbasis sesi NextAuth.js
- **Public API**: Tidak memerlukan autentikasi
- **File Upload**: Autentikasi berbasis sesi

### Manajemen Sesi
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Logic yang memerlukan autentikasi
}
```

### Route yang Dilindungi
Semua endpoint admin memerlukan autentikasi:
- `/api/toggles/*` - Manajemen toggle
- `/api/files/*` - Operasi file

## 📊 Format Response

### Struktur Response Standar
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

### Contoh Response Sukses
```json
{
  "success": true,
  "message": "Toggle berhasil diambil",
  "data": [
    {
      "id": "toggle-123",
      "name": "Checkout Flow Baru",
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

### Contoh Response Error
```json
{
  "success": false,
  "message": "Gagal membuat toggle",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Nama wajib diisi"
  }
}
```

## 🎛️ API Manajemen Toggle

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
      "name": "Nama Fitur",
      "description": "Deskripsi fitur",
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

### Buat Toggle
```http
POST /api/toggles
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Fitur Baru",
  "description": "Deskripsi fitur",
  "value": true,
  "type": "BOOLEAN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Toggle berhasil dibuat",
  "data": {
    "id": "toggle-456",
    "name": "Fitur Baru",
    "key": "fitur-baru-def456",
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
  "name": "Nama Fitur Diperbarui",
  "description": "Deskripsi diperbarui",
  "value": false,
  "type": "BOOLEAN"
}
```

### Update Status Toggle
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

### Hapus Toggle
```http
DELETE /api/toggles/[id]
Authorization: Session-based
```

## 🌐 Public API

### Dapatkan Toggle berdasarkan Key
```http
GET /api/public/toggles/[key]
```

**Response (Toggle Ditemukan):**
```json
{
  "enabled": true,
  "key": "new-checkout-flow",
  "name": "Checkout Flow Baru",
  "value": true,
  "type": "BOOLEAN"
}
```

**Response (Toggle Tidak Ditemukan):**
```json
{
  "enabled": false,
  "value": null,
  "message": "Toggle tidak ditemukan atau tidak aktif"
}
```

### List Semua Toggle Publik
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
      "name": "Fitur A",
      "value": true,
      "type": "BOOLEAN"
    },
    {
      "enabled": true,
      "key": "feature-b", 
      "name": "Fitur B",
      "value": "production",
      "type": "STRING"
    }
  ]
}
```

## 🚀 Caching & Performance

### Cache Headers
Semua response public API menyertakan cache headers:

```http
Cache-Control: public, max-age=300, s-maxage=3600
CDN-Cache-Control: max-age=3600
X-Cache-Source: S3-Cache | Database
X-Cache-Status: HIT | MISS
X-CloudFront-Hit: true | false
X-CloudFront-Cache: HIT | MISS | UNKNOWN
```

### Konfigurasi Cache
```typescript
// Dapat dikonfigurasi via environment variables
const BROWSER_CACHE = parseInt(process.env.BROWSER_CACHE_SECONDS || '300')    // 5 menit
const CLOUDFRONT_CACHE = parseInt(process.env.CLOUDFRONT_CACHE_SECONDS || '3600') // 1 jam
```

### Cache Invalidation
Cache otomatis di-invalidate saat:
- Pembuatan toggle
- Update toggle
- Penghapusan toggle
- Perubahan status toggle

## 📁 API Upload File

### Upload File
```http
POST /api/files
Authorization: Session-based
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "konten file sebagai string",
  "filename": "backup.json"
}
```

**Response:**
```json
{
  "key": "toggles/uuid-backup.json",
  "url": "https://cloudfront-domain.com/toggles/uuid-backup.json",
  "message": "File berhasil diupload"
}
```

## 🔄 API Redirect CDN

### Dapatkan URL CloudFront
```http
GET /api/cdn/toggles/[key]
```

**Response:**
```http
HTTP/1.1 302 Found
Location: https://cloudfront-domain.com/public/toggles/[key].json
```

## ⚡ Optimasi Performance

### Response Times
- **Cached Requests**: <50ms (CloudFront)
- **Origin Requests**: <200ms (Database)
- **Cache Miss**: <300ms (Database + Cache Update)

### Rate Limiting
- **Public API**: Rate limited via CloudFront
- **Admin API**: Session-based throttling
- **File Upload**: Size dan frequency limits

### Monitoring Headers
```http
X-Response-Time: 45ms
X-Cache-Hit-Rate: 85%
X-Database-Query-Time: 12ms
X-Cache-Update-Time: 8ms
```

## 🛡️ Keamanan

### Validasi Input
Semua endpoint menggunakan schema Zod untuk validasi:

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
  // Logic API
} catch (error) {
  console.error('API Error:', error)
  
  if (error instanceof z.ZodError) {
    return NextResponse.json({
      success: false,
      message: 'Error validasi',
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

## 📊 Contoh Penggunaan API

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

// Penggunaan
const client = new ToggleClient('https://your-domain.com')
const isNewFeatureEnabled = await client.isEnabled('fitur-baru')
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

// Penggunaan dalam komponen
function FeatureComponent() {
  const { enabled, loading } = useToggle('fitur-baru')
  
  if (loading) return <Loading />
  
  return enabled ? <FiturBaru /> : <FiturLama />
}
```

### Contoh cURL
```bash
# Dapatkan toggle
curl -X GET "https://your-domain.com/api/public/toggles/feature-key"

# Buat toggle (memerlukan autentikasi)
curl -X POST "https://your-domain.com/api/toggles" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "name": "Fitur Baru",
    "value": true,
    "type": "BOOLEAN"
  }'

# Update status toggle
curl -X PATCH "https://your-domain.com/api/toggles/toggle-id" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"isActive": false}'
```

## 🔍 Debugging & Monitoring

### Debug Headers
Aktifkan debug mode untuk mendapat header tambahan:
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

## 📚 Dokumentasi Terkait

- [Detail API Toggle](./toggle-api.md)
- [Panduan Public API](./public-api.md)
- [Referensi Cache API](./cache-api.md)
- [Fitur Utama](../features/core-features.md)
- [Sistem Caching](../features/caching-system.md)