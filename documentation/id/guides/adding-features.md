# 🚀 Panduan Menambah Fitur Baru

Panduan ini memberikan instruksi langkah demi langkah untuk menambahkan fitur baru ke Sistem Manajemen Feature Toggle dengan mengikuti prinsip FSD (Feature-Sliced Design).

## 📋 Prasyarat

Sebelum menambahkan fitur baru, pastikan Anda memahami:
1. [Arsitektur FSD](../architecture/fsd-architecture.md)
2. [Aturan Pengembangan FSD](./fsd-rules.md)
3. [Struktur Proyek](../architecture/project-structure.md)

## 🎯 Proses Pengembangan Fitur

### Langkah 1: Rencanakan Fitur

#### 1.1 Definisikan Scope Fitur
```markdown
Nama Fitur: [nama-fitur]
Deskripsi: [Apa yang dilakukan fitur ini?]
Entity yang Dibutuhkan: [Entity bisnis mana yang terlibat?]
Komponen UI: [Komponen UI apa yang dibutuhkan?]
API Endpoints: [Endpoint API apa yang diperlukan?]
```

#### 1.2 Identifikasi Dependencies
- Entity yang sudah ada mana yang akan digunakan?
- Komponen shared mana yang dibutuhkan?
- Entity baru apa yang perlu dibuat?

### Langkah 2: Buat Entity (jika diperlukan)

#### 2.1 Struktur Entity
```bash
# Buat direktori entity
mkdir -p src/entities/[nama-entity]/{model,api,lib}
```

#### 2.2 Implementasi Entity
```typescript
// src/entities/[nama-entity]/model/[nama-entity].ts
export interface NamaEntity {
  id: string
  // ... properti lainnya
}

export type CreateEntityRequest = Omit<NamaEntity, 'id'>
export type UpdateEntityRequest = Partial<CreateEntityRequest>
```

#### 2.3 Entity Hooks
```typescript
// src/entities/[nama-entity]/model/use-[nama-entity].ts
import { useState, useEffect } from 'react'

export function useNamaEntity() {
  const [data, setData] = useState<NamaEntity[]>([])
  const [loading, setLoading] = useState(false)
  
  // Implementasi
  
  return { data, loading, /* method lainnya */ }
}
```

#### 2.4 Entity API
```typescript
// src/entities/[nama-entity]/api/[nama-entity]-api.ts
import { api } from '@/shared/api'

export const namaEntityApi = {
  getAll: () => api.get('/api/nama-entity'),
  getById: (id: string) => api.get(`/api/nama-entity/${id}`),
  create: (data: CreateEntityRequest) => api.post('/api/nama-entity', data),
  update: (id: string, data: UpdateEntityRequest) => 
    api.put(`/api/nama-entity/${id}`, data),
  delete: (id: string) => api.delete(`/api/nama-entity/${id}`)
}
```

#### 2.5 Entity Index
```typescript
// src/entities/[nama-entity]/index.ts
export type { NamaEntity, CreateEntityRequest, UpdateEntityRequest } from './model/[nama-entity]'
export { useNamaEntity } from './model/use-[nama-entity]'
export { namaEntityApi } from './api/[nama-entity]-api'
export * from './lib/[nama-entity]-helpers'
```

### Langkah 3: Buat Feature

#### 3.1 Struktur Feature
```bash
# Buat direktori feature
mkdir -p src/features/[nama-fitur]/{model,ui}
```

#### 3.2 Business Logic Feature
```typescript
// src/features/[nama-fitur]/model/use-[nama-fitur].ts
import { useNamaEntity } from '@/entities/[nama-entity]'

export function useNamaFitur() {
  const { data, loading } = useNamaEntity()
  
  const handleAction = () => {
    // Business logic spesifik fitur
  }
  
  return {
    data,
    loading,
    handleAction
  }
}
```

#### 3.3 Feature Schemas
```typescript
// src/features/[nama-fitur]/model/schemas.ts
import { z } from 'zod'

export const fiturSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  description: z.string().optional(),
  // ... field lainnya
})

export type FiturFormData = z.infer<typeof fiturSchema>
```

#### 3.4 Komponen UI Feature
```typescript
// src/features/[nama-fitur]/ui/[nama-fitur]-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { fiturSchema, type FiturFormData } from '../model/schemas'

export function NamaFiturForm() {
  const form = useForm<FiturFormData>({
    resolver: zodResolver(fiturSchema)
  })
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Implementasi form */}
    </form>
  )
}
```

#### 3.5 Feature Index
```typescript
// src/features/[nama-fitur]/index.ts
export { useNamaFitur } from './model/use-[nama-fitur]'
export { fiturSchema, type FiturFormData } from './model/schemas'
export { NamaFiturForm } from './ui/[nama-fitur]-form'
export { NamaFiturTable } from './ui/[nama-fitur]-table'
```

### Langkah 4: Buat API Endpoints

#### 4.1 Struktur API Route
```bash
# Buat API routes
mkdir -p src/app/api/[nama-entity]
touch src/app/api/[nama-entity]/route.ts
mkdir -p src/app/api/[nama-entity]/[id]
touch src/app/api/[nama-entity]/[id]/route.ts
```

#### 4.2 Implementasi API
```typescript
// src/app/api/[nama-entity]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await prisma.namaEntity.findMany()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Implementasi
}
```

### Langkah 5: Buat Widget (jika diperlukan)

#### 5.1 Struktur Widget
```bash
# Buat direktori widget
mkdir -p src/widgets/[nama-widget]
```

#### 5.2 Implementasi Widget
```typescript
// src/widgets/[nama-widget]/[nama-widget]-widget.tsx
import { NamaFiturForm } from '@/features/[nama-fitur]'
import { NamaFiturTable } from '@/features/[nama-fitur]'

export function NamaWidgetWidget() {
  return (
    <div className="space-y-6">
      <NamaFiturForm />
      <NamaFiturTable />
    </div>
  )
}
```

### Langkah 6: Tambah Database Schema (jika diperlukan)

#### 6.1 Update Prisma Schema
```prisma
// prisma/schema.prisma
model NamaEntity {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  @@map("nama_entities")
}
```

#### 6.2 Generate dan Push Schema
```bash
# Generate Prisma client
bun run db:generate

# Push schema ke database
bun run db:push
```

### Langkah 7: Tambah ke App Router

#### 7.1 Buat Page
```typescript
// src/app/(private)/[nama-fitur]/page.tsx
import { NamaWidgetWidget } from '@/widgets/[nama-widget]'

export default function NamaFiturPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Nama Fitur</h1>
      <NamaWidgetWidget />
    </div>
  )
}
```

#### 7.2 Update Navigation
```typescript
// Update navigation di shared/components/nav-main.tsx
const items = [
  // ... item yang sudah ada
  {
    title: "Nama Fitur",
    url: "/nama-fitur",
    icon: IconName,
  }
]
```

## 🔍 Contoh: Menambah Fitur Rollout

### Langkah 1: Perencanaan
```markdown
Nama Fitur: rollout
Deskripsi: Rollout berbasis persentase untuk fitur
Entity yang Dibutuhkan: rollout
Komponen UI: RolloutForm, RolloutTable, RolloutControls
API Endpoints: /api/rollouts, /api/rollouts/[id]
```

### Langkah 2: Buat Rollout Entity
```bash
mkdir -p src/entities/rollout/{model,api,lib}
```

```typescript
// src/entities/rollout/model/rollout.ts
export interface Rollout {
  id: string
  toggleId: string
  percentage: number
  strategy: 'PERCENTAGE' | 'USER_BASED' | 'GEOGRAPHIC'
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### Langkah 3: Buat Rollout Feature
```bash
mkdir -p src/features/rollout/{model,ui}
```

```typescript
// src/features/rollout/model/use-rollout.ts
import { useRollout } from '@/entities/rollout'

export function useRolloutManagement() {
  const { data, loading } = useRollout()
  
  const updatePercentage = (id: string, percentage: number) => {
    // Implementasi
  }
  
  return { data, loading, updatePercentage }
}
```

### Langkah 4: Lanjutkan dengan langkah-langkah yang tersisa...

## ✅ Checklist

Sebelum submit fitur Anda:

### Kualitas Kode
- [ ] Mengikuti prinsip arsitektur FSD
- [ ] Tidak ada circular dependencies
- [ ] Type TypeScript yang tepat
- [ ] Error handling diimplementasi
- [ ] Loading states ditangani

### Testing
- [ ] Unit tests untuk business logic
- [ ] Integration tests untuk API endpoints
- [ ] Component tests untuk UI
- [ ] E2E tests untuk flow kritis

### Dokumentasi
- [ ] Fitur didokumentasikan di `/documentation/features/`
- [ ] API endpoints didokumentasikan di `/documentation/api/`
- [ ] README utama diupdate jika diperlukan

### Performance
- [ ] Tidak ada re-render yang tidak perlu
- [ ] Strategi data fetching yang tepat
- [ ] Bundle size yang optimal
- [ ] Caching diimplementasi jika sesuai

## 🚨 Kesalahan Umum

### ❌ Dependency Layer yang Salah
```typescript
// ❌ Jangan import features di entities
// src/entities/toggle/model/toggle.ts
import { ToggleForm } from '@/features/toggle/ui/toggle-form'

// ✅ Benar: entities hanya menggunakan shared
import { api } from '@/shared/api'
```

### ❌ Business Logic di UI
```typescript
// ❌ Jangan taruh business logic di komponen UI
export function ToggleForm() {
  const handleSubmit = async (data) => {
    // Business logic kompleks di sini ❌
  }
}

// ✅ Benar: business logic di model layer
export function ToggleForm() {
  const { handleSubmit } = useToggleActions() // ✅
}
```

### ❌ Akses Database Langsung di Features
```typescript
// ❌ Jangan akses database langsung di features
import { prisma } from '@/shared/lib/prisma'

// ✅ Benar: gunakan entity APIs
import { toggleApi } from '@/entities/toggle'
```

## 📚 Langkah Selanjutnya

Setelah menambah fitur Anda:
1. Update dokumentasi [Fitur Utama](../features/core-features.md)
2. Tambah dokumentasi API di [Referensi API](../api/overview.md)
3. Update [Struktur Proyek](../architecture/project-structure.md) jika diperlukan
4. Pertimbangkan menambah ke roadmap [Blueprint](../../../blueprint.md)

## 🤝 Mendapat Bantuan

Jika Anda butuh bantuan:
1. Tinjau [Aturan Pengembangan FSD](./fsd-rules.md)
2. Periksa implementasi yang sudah ada di codebase
3. Ajukan pertanyaan di diskusi tim
4. Buat issue dengan pertanyaan spesifik