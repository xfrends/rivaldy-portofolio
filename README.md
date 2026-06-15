# Portofolio Fotografi

Sebuah website portofolio fotografi yang modern, cepat, dan responsif, dibangun menggunakan [Astro](https://astro.build).

## 🚀 Cara Deploy ke Cloudflare Pages (Gratis)

Proyek ini dapat di-deploy secara gratis ke Cloudflare Pages. Ikuti langkah-langkah berikut:

### Persiapan
1. Pastikan Anda memiliki akun [Cloudflare](https://dash.cloudflare.com/).
2. Pastikan seluruh kode sumber (source code) proyek ini sudah di-push ke repository GitHub atau GitLab Anda.

### Langkah-Langkah Deployment
1. Login ke dashboard Cloudflare.
2. Buka menu **Workers & Pages** di sidebar sebelah kiri.
3. Klik tombol **Create application**, kemudian pilih tab **Pages**.
4. Klik **Connect to Git** dan hubungkan dengan akun GitHub/GitLab Anda.
5. Pilih repository yang berisi proyek portofolio ini, lalu klik **Begin setup**.
6. Pada bagian **Build settings**, sesuaikan konfigurasi berikut:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. *(Opsional - Hanya jika Anda menggunakan fitur Admin CMS)* Klik **Environment variables (advanced)** dan tambahkan:
   - `ADMIN_PASSWORD`: password rahasia admin
   - `ADMIN_USERNAME`: opsional, default `admin`
   - `ADMIN_SESSION_SECRET`: opsional, default memakai `ADMIN_PASSWORD`
   - `SITE_URL`: URL situs Anda (misal: `https://portofolio-anda.pages.dev`)
8. Klik **Save and Deploy**. Cloudflare akan memproses build dan situs Anda akan segera online!

### Pengaturan Lanjutan (Jika Menggunakan Admin CMS)
Jika Anda ingin bisa mengunggah foto melalui halaman `/admin` langsung dari HP/Web, atur penyimpanan (Storage) Cloudflare berikut:

#### Environment Variables
Salin `.env.example` menjadi `.env` untuk development lokal:

```bash
cp .env.example .env
```

Isi yang wajib:

| Key | Dipakai untuk | Contoh |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Password admin statis, wajib untuk login CMS | `password-kuat` |
| `ADMIN_USERNAME` | Login admin statis, opsional default `admin` | `admin` |
| `ADMIN_SESSION_SECRET` | Signing cookie session admin, opsional default `ADMIN_PASSWORD` | `teks-random-panjang` |
| `SITE_URL` | URL canonical/site config | `https://portofolio-anda.pages.dev` |

Key referensi resource Cloudflare di `.env.example`:

| Key | Keterangan |
| --- | --- |
| `CLOUDFLARE_D1_DATABASE_NAME` | Nama D1 database untuk data CMS |
| `CLOUDFLARE_D1_DATABASE_ID` | ID D1 database dari dashboard/`wrangler d1 list` |
| `CLOUDFLARE_R2_BUCKET_NAME` | Nama R2 bucket untuk file gambar |
| `CLOUDFLARE_KV_SESSION_NAMESPACE_ID` | ID KV namespace untuk session Astro |
| `CLOUDFLARE_KV_ANALYTICS_NAMESPACE_ID` | ID KV namespace untuk dashboard analytics |

Catatan: binding runtime Cloudflare tidak dibaca dari `.env`. Untuk deploy via Cloudflare Pages dari Git, buat binding di **Cloudflare Pages Settings > Functions**. Jangan commit placeholder ID binding ke `wrangler.jsonc`, karena Cloudflare akan memvalidasi file itu saat deploy.

#### Cloudflare Bindings
1. Buka kembali pengaturan proyek Pages Anda di Cloudflare.
2. Buka menu **Settings** > **Functions** > **R2 bucket bindings**.
   - Buat sebuah R2 Bucket baru (gratis tier tersedia).
   - Tambahkan *binding* baru dengan Variable name: `GALLERY_BUCKET` dan hubungkan ke bucket yang baru dibuat.
3. Buka menu **Settings** > **Functions** > **D1 database bindings**.
   - Buat sebuah D1 Database baru.
   - Tambahkan *binding* baru dengan Variable name: `DB` dan hubungkan ke database yang baru dibuat.
4. Buka menu **Settings** > **Functions** > **KV namespace bindings**.
   - Buat dua KV Namespace baru.
   - Tambahkan *binding* baru dengan Variable name: `SESSION` dan hubungkan ke namespace yang baru dibuat.
   - Tambahkan *binding* baru dengan Variable name: `ANALYTICS` dan hubungkan ke namespace analytics yang baru dibuat.
5. Lakukan **Redeploy** (deploy ulang) dari halaman utama proyek Pages Anda agar pengaturan ini aktif.

#### Mapping Binding yang Wajib

| Binding | Tipe Cloudflare | Fungsi |
| --- | --- | --- |
| `DB` | D1 Database | Menyimpan content CMS, collections, posts, relasi post-collection, dan metadata image |
| `GALLERY_BUCKET` | R2 Bucket | Menyimpan file gambar WebP hasil upload CMS, termasuk hero/about image |
| `SESSION` | KV Namespace | Session internal Astro/Cloudflare adapter |
| `ANALYTICS` | KV Namespace | Total view, view per page, collection, dan post |

Untuk preview lokal setelah build:

```bash
npm run build
npm run preview:pages
```

---

## 📝 Cara Mengelola Konten

- **Admin CMS**: buka `/admin`, lalu kelola data dari menu Dashboard, Content, Pricelist, Collections, dan Posts.
- **Content**: hero title, hero tagline, hero image, about image, dan about text disimpan di Cloudflare D1 melalui binding `DB`.
- **Pricelist**: paket harga, fitur, status popular, dan show/hide paket disimpan di Cloudflare D1 melalui binding `DB`.
- **Collections**: data collection disimpan di Cloudflare D1 melalui binding `DB`.
- **Posts**: data post, relasi collection, title, description, dan metadata image disimpan di D1.
- **Images**: file gambar disimpan di R2 melalui binding `GALLERY_BUCKET`; upload dari admin dikonversi ke WebP di frontend sebelum dikirim.
- **Profil & Website**: edit file `site.config.mts` untuk mengubah nama situs, ikon, nama fotografer, dsb.
- **Halaman About**: ubah teks dan gambar halaman *About* di `src/pages/about.astro`.
