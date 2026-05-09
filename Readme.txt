# Sistem Pendaftaran Mahasiswa Baru

Proyek ini adalah aplikasi antarmuka web statis untuk mengelola data pendaftaran mahasiswa baru. Sistem ini dibangun tanpa menggunakan backend, melainkan memanfaatkan LocalStorage pada browser untuk menyimpan data secara persisten di sisi klien. Proyek ini mendemonstrasikan implementasi antarmuka yang responsif, minimalis, dan fungsional dengan menggunakan arsitektur modul JavaScript native.

## Fitur Utama

Sistem ini dilengkapi dengan beberapa fungsionalitas utama untuk memastikan integritas data dan kemudahan pengolahan:

*   **Validasi Input dan Duplikasi**: Sistem mencegah input nilai tes di luar rentang 0 hingga 100. Sistem juga secara aktif memeriksa dan menolak pendaftaran jika kode pendaftaran yang dimasukkan sudah terdaftar sebelumnya melalui pop-up modal peringatan.
*   **Kalkulasi Logika Otomatis**: Sistem secara otomatis mengekstrak informasi gedung lokasi tes berdasarkan karakter pertama dari kode pendaftaran. Selain itu, sistem menghitung nilai rata-rata dari tiga mata pelajaran dan menentukan status kelulusan peserta berdasarkan kriteria nilai minimum.
*   **Modal Ulasan Data**: Menampilkan jendela modal khusus yang memuat rincian data pendaftar untuk ditinjau ulang sebelum data tersebut dieksekusi dan disimpan ke dalam memori peramban.
*   **Pengurutan Data Berkelanjutan**: Tabel pendaftaran secara otomatis merapikan dan mengurutkan baris data berdasarkan abjad pada kolom kode pendaftaran setiap kali antarmuka diperbarui.

## Struktur Direktori

Kode sumber dipisahkan ke dalam beberapa berkas untuk memisahkan logika bisnis, antarmuka pengguna, dan manajemen penyimpanan agar mudah dipelihara.

```text
/
├── index.html        (Kerangka antarmuka utama dan formulir)
├── style.css         (Desain visual dan tata letak responsif)
└── js/
    ├── main.js       (Pengendali utama dan pendengar kejadian)
    ├── logic.js      (Fungsi kalkulasi matematika dan manipulasi teks)
    ├── storage.js    (Pengelolaan memori LocalStorage)
    └── ui.js         (Fungsi pembaruan tabel ke dalam Document Object Model)