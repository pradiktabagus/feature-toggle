# 🚀 Panduan Memulai

Panduan ini akan membantu Anda mengatur dan menjalankan Sistem Manajemen Feature Toggle secara lokal serta memahami struktur proyek.

## 📋 Prasyarat

### Software yang Diperlukan
- **Node.js** 18+ atau **Bun** (direkomendasikan)
- **Git** untuk version control
- **Code Editor** (VS Code direkomendasikan)

### Layanan yang Diperlukan
1. **MongoDB Atlas** - Hosting database
2. **Google OAuth App** - Provider autentikasi
3. **GitHub OAuth App** - Provider autentikasi  
4. **AWS Account** - S3 storage dan CloudFront CDN
5. **Vercel Account** - Platform deployment (opsional)

## ⚡ Setup Cepat

### 1. Clone Repository
```bash
git clone https://github.com/pradiktabagus/feature-toggle.git
cd feature-toggle
```

### 2. Install Dependencies
```bash
# Menggunakan Bun (direkomendasikan)
bun install

# Atau menggunakan npm
npm install
```

### 3. Setup Environment
```bash
# Copy template environment
cp .env.example .env.local
```

Isi environment variables di `.env.local`:
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Konfigurasi AWS
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-s3-bucket-name"

# Konfigurasi CloudFront
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-distribution-id"

# Konfigurasi Cache (dalam detik)
BROWSER_CACHE_SECONDS=300      # Browser cache: 5 menit
CLOUDFRONT_CACHE_SECONDS=3600  # CloudFront cache: 1 jam
```

### 4. Setup Database
```bash
# Generate Prisma client
bun run db:generate

# Push schema ke database
bun run db:push

# (Opsional) Buka Prisma Studio
bun run db:studio
```

### 5. Jalankan Development Server
```bash
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔧 Setup Detail

### Setup MongoDB Atlas

1. **Buat Account**
   - Kunjungi [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Buat akun gratis
   - Buat cluster baru

2. **Konfigurasi Database**
   - Pilih cloud provider dan region
   - Pilih tier gratis (M0)
   - Buat cluster

3. **Network Access**
   - Tambah IP address (0.0.0.0/0 untuk development)
   - Buat database user
   - Dapatkan connection string

### Setup Google OAuth

1. **Google Cloud Console**
   - Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
   - Buat project baru atau pilih yang ada
   - Aktifkan Google+ API

2. **OAuth Credentials**
   - Pergi ke Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://your-domain.com/api/auth/callback/google`

### Setup GitHub OAuth

1. **GitHub Settings**
   - Kunjungi [GitHub Settings → Developer settings](https://github.com/settings/developers)
   - Klik "New OAuth App"

2. **Konfigurasi Aplikasi**
   - Application name: Feature Toggle System
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL:
     - Development: `http://localhost:3000/api/auth/callback/github`
     - Production: `https://your-domain.com/api/auth/callback/github`

### Setup AWS

1. **Buat AWS Account**
   - Daftar di [AWS Console](https://aws.amazon.com/)
   - Dapatkan access keys dari IAM

2. **Setup S3 Bucket**
   ```bash
   # Buat S3 bucket
   aws s3 mb s3://your-bucket-name --region us-east-1
   ```

3. **CloudFront Distribution**
   - Buat CloudFront distribution
   - Origin: Domain API Anda
   - Cache behaviors: `/api/public/toggles/*`
   - Dapatkan distribution ID

4. **IAM Permissions**
   Gunakan policy dari `aws-iam-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject", 
           "s3:DeleteObject"
         ],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "arn:aws:cloudfront::*:distribution/your-distribution-id"
       }
     ]
   }
   ```

## 📁 Struktur Proyek

### Gambaran Tingkat Tinggi
```
feature-toggle/
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   ├── entities/          # Business entities (FSD)
│   ├── features/          # Business features (FSD)
│   ├── widgets/           # Complex UI blocks (FSD)
│   └── shared/            # Shared utilities (FSD)
├── prisma/                # Database schema
├── documentation/         # Dokumentasi proyek
├── public/               # Static assets
└── file konfigurasi
```

### Arsitektur FSD
Proyek mengikuti arsitektur **Feature-Sliced Design (FSD)**:

```
src/
├── app/           # Application layer (Next.js)
├── widgets/       # Complex UI blocks
├── features/      # Business features
├── entities/      # Business entities
└── shared/        # Shared utilities
```

Pelajari lebih lanjut: [Panduan Arsitektur FSD](../architecture/fsd-architecture.md)

## 🛠️ Script yang Tersedia

### Development
```bash
bun dev              # Start development server
bun build            # Build untuk production
bun start            # Start production server
bun lint             # Jalankan ESLint
bun type-check       # Jalankan TypeScript check
```

### Database
```bash
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema ke database
bun run db:studio    # Buka Prisma Studio
bun run db:reset     # Reset database (development only)
```

### Testing
```bash
bun test             # Jalankan tests
bun test:watch       # Jalankan tests dalam watch mode
bun test:coverage    # Jalankan tests dengan coverage
```

## 🎯 Langkah Pertama Setelah Setup

### 1. Verifikasi Instalasi
- [ ] Development server berjalan tanpa error
- [ ] Koneksi database bekerja
- [ ] OAuth login bekerja (Google/GitHub)
- [ ] Dapat membuat/melihat toggles

### 2. Jelajahi Aplikasi
1. **Login** dengan Google atau GitHub
2. **Navigasi** ke halaman Toggle Features
3. **Buat** toggle baru
4. **Test** endpoint public API
5. **Periksa** cache headers di browser dev tools

### 3. Test Public API
```bash
# Test public API
curl http://localhost:3000/api/public/toggles

# Test toggle spesifik
curl http://localhost:3000/api/public/toggles/your-toggle-key
```

## 🔍 Troubleshooting

### Masalah Umum

#### Error Koneksi Database
```bash
Error: P1001: Can't reach database server
```
**Solusi**: Periksa network access MongoDB Atlas dan connection string

#### Error OAuth
```bash
Error: Invalid client_id
```
**Solusi**: Verifikasi OAuth credentials dan callback URLs

#### Error Build
```bash
Module not found: Can't resolve '@/...'
```
**Solusi**: Periksa TypeScript paths di `tsconfig.json`

### Mode Debug
```bash
# Aktifkan debug logging
DEBUG=* bun dev

# Periksa environment variables
bun run env-check
```

## 🚀 Langkah Selanjutnya

### Untuk Developer
1. **Pelajari FSD**: Baca [Panduan Arsitektur FSD](../architecture/fsd-architecture.md)
2. **Tambah Fitur**: Ikuti [Panduan Menambah Fitur Baru](./adding-features.md)
3. **Ikuti Aturan**: Periksa [Aturan Pengembangan FSD](./fsd-rules.md)

### Untuk Pengguna API
1. **Referensi API**: Baca [Dokumentasi API](../api/overview.md)
2. **Public API**: Periksa [Panduan Public API](../api/public-api.md)
3. **Caching**: Pahami [Sistem Caching](../features/caching-system.md)

## 📚 Resource Tambahan

- [Blueprint Proyek](../../../blueprint.md) - Roadmap pengembangan
- [File Konfigurasi](../architecture/project-structure.md) - Penjelasan file
- [Tech Stack](../architecture/tech-stack.md) - Teknologi yang digunakan
- [Fitur Utama](../features/core-features.md) - Dokumentasi fitur

---

**Butuh bantuan?** Periksa [dokumentasi](../README.md) atau buat issue dengan informasi detail tentang masalah Anda.