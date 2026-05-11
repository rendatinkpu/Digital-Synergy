# PWA GitHub Pages untuk Google Apps Script

Paket ini adalah PWA wrapper untuk link Apps Script berikut:

`https://script.google.com/macros/s/AKfycbxKbvrkWow4UFEHWj_DrqpF5r3-2A8WMKqa5i9s3zymxSOijilpycJ_F6iL1VGeH-qu4g/exec`

## Isi file

- `index.html` — halaman utama PWA.
- `style.css` — tampilan fixed mobile seperti aplikasi HP.
- `app.js` — logic iframe, install prompt, reload, dan service worker.
- `config.js` — tempat mengganti URL Apps Script.
- `manifest.webmanifest` — konfigurasi install PWA.
- `service-worker.js` — cache shell PWA.
- `icons/` — ikon PWA.
- `.nojekyll` — agar GitHub Pages menyajikan file apa adanya.

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `bukti-dukung-pwa`.
2. Upload semua isi folder ini ke repository, jangan upload file ZIP-nya saja.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Klik **Save**.
6. Tunggu GitHub Pages aktif, biasanya URL-nya seperti:
   `https://USERNAME.github.io/bukti-dukung-pwa/`

## Penting untuk Apps Script

Agar Apps Script dapat tampil di dalam PWA GitHub Pages:

1. Deploy Apps Script sebagai **Web app**.
2. Set **Who has access** ke **Anyone** atau **Anyone with the link**.
3. Kalau halaman tidak muncul di iframe, tambahkan ini pada output HTML Apps Script:

```javascript
return HtmlService
  .createHtmlOutputFromFile('index')
  .setTitle('Bukti Dukung')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
```

Jika Apps Script tetap meminta login Google, PWA akan ikut menampilkan halaman login atau pengguna perlu membuka tombol **Buka aplikasi asli**.

## Mengganti nama aplikasi

Edit `config.js`:

```javascript
window.APP_CONFIG = {
  appName: "Nama Aplikasi Baru",
  appShortName: "NamaPendek",
  appsScriptUrl: "URL_APPS_SCRIPT_BARU"
};
```

Lalu edit juga `manifest.webmanifest` agar nama aplikasi saat di-install ikut berubah.
