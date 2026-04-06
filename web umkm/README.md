# Website Toko Sembako

Website toko sembako modern dengan integrasi Google Spreadsheet untuk manajemen produk.

## Fitur

- ✅ Desain responsif dengan Tailwind CSS
- ✅ Data produk dari Google Spreadsheet
- ✅ Pencarian produk real-time
- ✅ Filter berdasarkan kategori
- ✅ Integrasi WhatsApp untuk pemesanan
- ✅ Tampilan stok produk
- ✅ Loading state yang smooth

## Cara Setup Google Spreadsheet

### 1. Buat Spreadsheet Baru

Buat Google Spreadsheet dengan struktur kolom berikut:

| Nama | Kategori | Harga | Stok | Gambar | Deskripsi |
|------|----------|-------|------|--------|-----------|
| Beras Premium | Beras | 15000 | 50 | https://example.com/beras.jpg | Beras premium kualitas terbaik |
| Minyak Goreng | Minyak | 25000 | 30 | https://example.com/minyak.jpg | Minyak goreng 1 liter |
| Gula Pasir | Gula | 12000 | 100 | https://example.com/gula.jpg | Gula pasir 1 kg |

### 2. Publish Spreadsheet sebagai CSV

1. Buka Google Spreadsheet Anda
2. Klik **File** → **Share** → **Publish to web**
3. Pilih **Entire Document**
4. Pilih format **Comma-separated values (.csv)**
5. Klik **Publish**
6. Copy URL yang dihasilkan

### 3. Update Konfigurasi

Buka file `script.js` dan ganti `SPREADSHEET_URL` dengan URL CSV Anda:

```javascript
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?output=csv';
```

### 4. Update Nomor WhatsApp

Ganti nomor WhatsApp di:
- `index.html` (bagian kontak)
- `script.js` (fungsi createProductCard)

Format: `6281234567890` (62 = kode negara Indonesia, tanpa +)

## Contoh Data Spreadsheet

```
Nama,Kategori,Harga,Stok,Gambar,Deskripsi
Beras Premium,Beras,15000,50,https://images.unsplash.com/photo-1586201375761-83865001e31c,Beras premium kualitas terbaik untuk keluarga
Minyak Goreng 1L,Minyak,25000,30,https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5,Minyak goreng berkualitas 1 liter
Gula Pasir 1kg,Gula,12000,100,https://images.unsplash.com/photo-1559056199-641a0ac8b55e,Gula pasir murni 1 kilogram
Telur Ayam,Telur,28000,75,https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f,Telur ayam segar 1 kg
Tepung Terigu,Tepung,10000,60,https://images.unsplash.com/photo-1628088062854-d1870b4553da,Tepung terigu serbaguna 1 kg
Kecap Manis,Bumbu,15000,40,https://images.unsplash.com/photo-1563636619-e9143da7973b,Kecap manis kualitas premium
Garam Dapur,Bumbu,3000,200,https://images.unsplash.com/photo-1598514982901-ae62764ae75e,Garam dapur beryodium
Susu UHT,Minuman,12000,80,https://images.unsplash.com/photo-1563636619-e9143da7973b,Susu UHT kotak 1 liter
```

## Cara Menjalankan

1. Buka file `index.html` di browser
2. Atau gunakan live server untuk development

## Teknologi

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Google Spreadsheet API (CSV)

## Customisasi

### Mengubah Warna Tema

Edit class Tailwind di `index.html`:
- `bg-green-600` → warna utama
- `text-green-600` → warna teks
- `hover:bg-green-700` → warna hover

### Menambah Kategori

Kategori akan otomatis terdeteksi dari data spreadsheet Anda.

## Tips

- Gunakan URL gambar dari Unsplash atau hosting gambar lainnya
- Pastikan spreadsheet dipublikasikan sebagai CSV, bukan sebagai web page
- Update data di spreadsheet akan otomatis muncul di website (refresh halaman)
- Untuk gambar lokal, upload ke hosting seperti Imgur atau Cloudinary

## Lisensi

Free to use untuk keperluan pribadi dan komersial.
