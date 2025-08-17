# 🏗️ Arsitektur Feature-Sliced Design (FSD)

## Gambaran Umum

Proyek ini mengimplementasikan **Feature-Sliced Design (FSD)**, metodologi arsitektur modern untuk aplikasi frontend yang menyediakan pemisahan concern yang jelas dan organisasi kode yang scalable.

## 📚 Layer FSD

### 1. **App Layer** (`src/app/`)
**Tujuan**: Inisialisasi aplikasi dan routing  
**Tanggung Jawab**: Next.js App Router, global providers, dan konfigurasi level aplikasi

```
src/app/
├── (private)/          # Route yang dilindungi
│   ├── dashboard/      # Halaman dashboard
│   └── toggle-features/ # Halaman manajemen toggle
├── api/                # API routes
│   ├── auth/           # Endpoint autentikasi
│   ├── toggles/        # Endpoint CRUD toggle
│   └── public/         # Endpoint API publik
├── auth/               # Halaman autentikasi
├── layout.tsx          # Root layout
├── page.tsx            # Halaman utama
└── providers.tsx       # Global providers
```

### 2. **Widgets Layer** (`src/widgets/`)
**Tujuan**: Blok UI kompleks yang menggabungkan beberapa fitur  
**Tanggung Jawab**: Komponen UI tingkat tinggi dengan business logic

```
src/widgets/
├── auth/
│   ├── auth-guard.tsx      # Proteksi route
│   ├── login-widget.tsx    # Widget form login
│   └── protected-route.tsx # Wrapper route yang dilindungi
└── toggle-features/
    └── index.tsx           # Widget manajemen toggle
```

### 3. **Features Layer** (`src/features/`)
**Tujuan**: Fitur bisnis dan use cases  
**Tanggung Jawab**: Logic dan komponen UI spesifik fitur

```
src/features/
└── toggle/
    ├── model/              # Business logic
    │   ├── schemas.ts      # Schema validasi
    │   ├── types.ts        # Type fitur
    │   ├── use-toggle-actions.ts
    │   ├── use-toggle-management.ts
    │   └── use-toggle-modal.ts
    └── ui/                 # Komponen UI fitur
        ├── toggle-table.tsx
        ├── toggle-form-modal.tsx
        ├── toggle-action.tsx
        └── json-viewer-modal.tsx
```

### 4. **Entities Layer** (`src/entities/`)
**Tujuan**: Entity bisnis dan domain logic  
**Tanggung Jawab**: Model bisnis inti dan operasi

```
src/entities/
├── toggle/
│   ├── model/
│   │   ├── toggle.ts       # Model entity toggle
│   │   └── use-toggles.ts  # Hook toggle
│   ├── api/                # API spesifik toggle
│   ├── lib/                # Utilities toggle
│   └── index.ts            # Export entity
├── user/
│   ├── model/
│   │   └── use-current-user.ts
│   └── api/
├── cache/                  # Entity cache
│   ├── lib/
│   │   ├── cache-sync.ts   # Sinkronisasi cache
│   │   └── cloudfront.ts   # Operasi CloudFront
│   └── index.ts
└── export/                 # Entity export
    ├── lib/
    │   └── auto-export.ts  # Fungsi auto export
    └── index.ts
```

### 5. **Shared Layer** (`src/shared/`)
**Tujuan**: Utilities dan komponen yang dapat digunakan kembali  
**Tanggung Jawab**: Pure functions, komponen UI, dan utilities umum

```
src/shared/
├── components/
│   ├── ui/                 # Komponen design system
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── layout/             # Komponen layout
│       ├── app-sidebar.tsx
│       ├── site-header.tsx
│       └── nav-*.tsx
├── lib/
│   ├── utils.ts            # Pure utilities
│   ├── auth.ts             # Konfigurasi auth
│   ├── prisma.ts           # Koneksi database
│   └── s3.ts               # S3 client
├── hooks/
│   ├── use-mobile.ts
│   └── use-theme.ts
├── types/
│   ├── api-response.ts
│   └── common.ts
└── api/
    ├── client.ts           # HTTP client
    └── types.ts            # Type API
```

## 🔄 Aturan Dependency

### ✅ Dependency yang Diizinkan
```
App → Widgets → Features → Entities → Shared
```

### ❌ Dependency yang Dilarang
- **Shared** tidak boleh import dari layer lain manapun
- **Entities** tidak boleh import dari Features, Widgets, atau App
- **Features** tidak boleh import dari Widgets atau App
- **Widgets** tidak boleh import dari App

### 📝 Contoh Import

```typescript
// ✅ Import yang benar
// Di features/toggle/
import { Button } from '@/shared/components/ui/button'
import { useToggle } from '@/entities/toggle'

// Di widgets/toggle-features/
import { ToggleTable } from '@/features/toggle/ui/toggle-table'
import { useCurrentUser } from '@/entities/user'

// Di app/toggle-features/
import { ToggleFeaturesWidget } from '@/widgets/toggle-features'

// ❌ Import yang salah
// Di entities/toggle/
import { ToggleTable } from '@/features/toggle/ui/toggle-table' // ❌

// Di shared/components/
import { useToggle } from '@/entities/toggle' // ❌
```

## 🎯 Keuntungan Arsitektur FSD

### 1. **Skalabilitas**
- Mudah menambah fitur baru tanpa mempengaruhi kode yang ada
- Batasan yang jelas antara bagian aplikasi yang berbeda
- Organisasi file yang dapat diprediksi

### 2. **Maintainability**
- Single responsibility untuk setiap layer
- Mudah menemukan dan memodifikasi fungsionalitas spesifik
- Coupling yang berkurang antar komponen

### 3. **Testability**
- Setiap layer dapat ditest secara independen
- Pemisahan yang jelas antara business logic dan UI
- Mudah untuk mock dependencies

### 4. **Kolaborasi Tim**
- Ownership yang jelas untuk layer yang berbeda
- Merge conflict yang berkurang
- Organisasi kode yang konsisten

## 🔧 Panduan Implementasi

### Pengembangan Entity
```typescript
// entities/[nama-entity]/
├── model/           # Business logic dan state
├── api/             # API calls spesifik entity
├── lib/             # Pure functions dan utilities
└── index.ts         # Export publik
```

### Pengembangan Feature
```typescript
// features/[nama-fitur]/
├── model/           # Business logic fitur
├── ui/              # Komponen UI fitur
└── index.ts         # Export fitur
```

### Pengembangan Widget
```typescript
// widgets/[nama-widget]/
├── [nama-widget].tsx    # Komponen widget utama
├── components/          # Komponen spesifik widget
└── index.ts             # Export widget
```

## 📊 Status Arsitektur Saat Ini

### ✅ Diimplementasi
- **Entities**: toggle, user, cache, export
- **Features**: manajemen toggle
- **Widgets**: auth, toggle-features
- **Shared**: komponen UI, utilities, API client

### 🚧 Dalam Pengembangan
- **Entities**: rollout, targeting, analytics
- **Features**: manajemen rollout, user targeting
- **Widgets**: dashboard analytics, kontrol rollout

### 📋 Direncanakan
- **Features**: scheduled toggles, bulk operations
- **Widgets**: analytics lanjutan, monitoring dashboard
- **Entities**: audit, notification, template

## 🔍 Validasi Arsitektur

### Pengecekan Dependency
```bash
# Periksa circular dependencies
npm run check-deps

# Validasi struktur FSD
npm run validate-fsd
```

### Kepatuhan Layer
- **Entities**: ✅ 90% patuh
- **Features**: ✅ 85% patuh  
- **Widgets**: ✅ 95% patuh
- **Shared**: ✅ 100% patuh

## 📚 Bacaan Lebih Lanjut

- [Dokumentasi Resmi FSD](https://feature-sliced.design/)
- [Panduan Menambah Fitur Baru](../guides/adding-features.md)
- [Aturan Pengembangan FSD](../guides/fsd-rules.md)
- [Struktur Proyek](./project-structure.md)