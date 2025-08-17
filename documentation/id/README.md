# 📚 Sistem Manajemen Feature Toggle - Dokumentasi Bahasa Indonesia

Selamat datang di dokumentasi lengkap Sistem Manajemen Feature Toggle dalam Bahasa Indonesia. Dokumentasi ini mencakup arsitektur, fitur, panduan pengembangan, dan referensi API.

## 📖 Struktur Dokumentasi

### 🏗️ Arsitektur
- [Panduan Arsitektur FSD](./architecture/fsd-architecture.md) - Implementasi Feature-Sliced Design
- [Struktur Proyek](./architecture/project-structure.md) - Penjelasan lengkap struktur folder
- [Tech Stack](./architecture/tech-stack.md) - Teknologi dan tools yang digunakan

### ⚡ Fitur
- [Fitur Utama](./features/core-features.md) - Fitur yang telah diimplementasi
- [Sistem Caching](./features/caching-system.md) - Arsitektur caching CloudFront + S3
- [Autentikasi](./features/authentication.md) - Detail implementasi OAuth

### 📋 Panduan Pengembangan
- [Memulai](./guides/getting-started.md) - Panduan setup dan instalasi
- [Menambah Fitur Baru](./guides/adding-features.md) - Panduan pengembangan fitur langkah demi langkah
- [Aturan Pengembangan FSD](./guides/fsd-rules.md) - Panduan dan best practices pengembangan
- [Panduan Testing](./guides/testing.md) - Strategi dan implementasi testing

### 🔌 Referensi API
- [Gambaran Umum API](./api/overview.md) - Arsitektur dan konvensi API
- [Toggle API](./api/toggle-api.md) - Endpoint manajemen toggle
- [Public API](./api/public-api.md) - API konsumsi toggle publik
- [Cache API](./api/cache-api.md) - Endpoint manajemen cache

## 🚀 Navigasi Cepat

### Untuk Developer
1. **Baru dengan proyek ini?** → Mulai dengan [Memulai](./guides/getting-started.md)
2. **Ingin menambah fitur?** → Baca [Menambah Fitur Baru](./guides/adding-features.md)
3. **Perlu memahami arsitektur?** → Lihat [Panduan Arsitektur FSD](./architecture/fsd-architecture.md)

### Untuk Pengguna API
1. **Menggunakan toggle di aplikasi Anda?** → Lihat [Gambaran Umum API](./api/overview.md)
2. **Memahami caching?** → Baca [Fitur Utama](./features/core-features.md)

### Untuk DevOps/Infrastructure
1. **Setup deployment?** → Lihat [Memulai](./guides/getting-started.md)
2. **Monitoring performa?** → Baca [Gambaran Umum API](./api/overview.md)

## 📊 Status Proyek

- **Phase Saat Ini**: Phase 1.5 Selesai ✅ (Core MVP + CDN Caching)
- **Phase Selanjutnya**: Phase 2 - Advanced Toggle Features 🚧
- **Arsitektur**: Feature-Sliced Design (FSD) ✅
- **Tech Stack**: Next.js 15 + TypeScript + MongoDB + AWS ✅

## 🤝 Berkontribusi

Sebelum berkontribusi, silakan baca:
1. [Aturan Pengembangan FSD](./guides/fsd-rules.md)
2. [Menambah Fitur Baru](./guides/adding-features.md)
3. [Panduan Arsitektur FSD](./architecture/fsd-architecture.md)

## 📞 Dukungan

Untuk pertanyaan atau masalah:
1. Periksa bagian dokumentasi yang relevan
2. Tinjau [Referensi API](./api/overview.md)
3. Buat issue dengan informasi detail

---

**Bahasa**: Indonesia  
**Terakhir Diperbarui**: Januari 2025  
**Versi Dokumentasi**: 1.0  
**Versi Proyek**: Phase 1.5