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
7. Sebelum deploy pertama, jalankan setup resource Cloudflare dari komputer lokal:
   ```bash
   npm run cf:setup
   ```
   Script ini akan membuat D1, KV, dan R2 dengan prefix `rivaldy`, lalu mengisi `wrangler.jsonc`.
8. Commit dan push `wrangler.jsonc` hasil generate.
9. *(Opsional - Hanya jika Anda menggunakan fallback login dari secret)* Klik **Variables and secrets** dan tambahkan sebagai **Secret**:
   - `ADMIN_PASSWORD`: password rahasia admin
   - `ADMIN_USERNAME`: opsional, default `admin`
   - `ADMIN_SESSION_SECRET`: opsional, default memakai `ADMIN_PASSWORD`
   - `SITE_URL`: URL situs Anda (misal: `https://portofolio-anda.pages.dev`)
10. Klik **Save and Deploy**. Cloudflare akan memproses build dan situs Anda akan segera online!

### Pengaturan Lanjutan (Jika Menggunakan Admin CMS)
Jika Anda ingin bisa mengunggah foto melalui halaman `/admin` langsung dari HP/Web, atur penyimpanan (Storage) Cloudflare berikut:

#### Environment Variables / Secrets
Salin `.env.example` menjadi `.env` untuk development lokal:

```bash
cp .env.example .env
```

Untuk lokal, isi `.env`. Untuk Cloudflare Pages, buat key yang sama di **Settings > Variables and secrets** dengan tipe **Secret**. Kode akan membaca `.env` saat local development dan membaca runtime secret dari Cloudflare saat production.

Isi yang dipakai:

| Key | Dipakai untuk | Contoh |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Password admin statis, wajib untuk login CMS | `password-kuat` |
| `ADMIN_USERNAME` | Login admin statis, opsional default `admin` | `admin` |
| `ADMIN_SESSION_SECRET` | Signing cookie session admin, opsional default `ADMIN_PASSWORD` | `teks-random-panjang` |
| `SITE_URL` | URL canonical/site config | `https://portofolio-anda.pages.dev` |

#### Generate Cloudflare Resources
Jalankan:

```bash
npm run cf:setup
```

Script ini idempotent: jika resource dengan nama berikut sudah ada, resource lama akan dipakai; jika belum ada, akan dibuat:

| Binding | Resource Cloudflare | Nama yang dibuat |
| --- | --- | --- |
| `DB` | D1 Database | `rivaldy-portfolio-cms` |
| `GALLERY_BUCKET` | R2 Bucket | `rivaldy-gallery` |
| `SESSION` | KV Namespace | `rivaldy-session` |
| `ANALYTICS` | KV Namespace | `rivaldy-analytics` |

Setelah selesai, script akan update `wrangler.jsonc` dengan ID resource yang valid. File `wrangler.jsonc` hasil generate harus di-commit karena Cloudflare Pages membaca binding dari file ini sebelum build berjalan.

Catatan: D1, R2, dan KV tidak bisa dibuat oleh kode runtime website karena resource harus sudah ada sebelum Worker/Pages aktif. Automasi dilakukan oleh script setup memakai Wrangler CLI.

#### Cloudflare Bindings
Jika memakai deploy dari GitHub/GitLab, binding D1/R2/KV akan dibaca dari `wrangler.jsonc` hasil `npm run cf:setup`. Anda tidak perlu menambahkan ID resource ke `.env`.

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
- **Pricelist**: CRUD paket harga melalui `/admin/pricelist`; fitur, status popular, show/hide, dan urutan paket disimpan di Cloudflare D1 melalui binding `DB`.
- **Collections**: data collection disimpan di Cloudflare D1 melalui binding `DB`.
- **Posts**: data post, relasi collection, title, description, dan metadata image disimpan di D1.
- **Images**: file gambar disimpan di R2 melalui binding `GALLERY_BUCKET`; upload dari admin dikonversi ke WebP di frontend sebelum dikirim.
- **Profil & Website**: edit file `site.config.mts` untuk mengubah nama situs, ikon, nama fotografer, dsb.
- **Halaman About**: ubah teks dan gambar halaman *About* di `src/pages/about.astro`.
