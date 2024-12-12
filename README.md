
# Tes Mini Project
## Soal
- Jelaskan apa itu normalisasi database, berikan contohnya, tulis jawaban di README.md
- Buat web aplikasi menggunakan front-end Vue.js gunakan data yang sudah Anda normalisasi pada soal nomor 1 (Backend bebas, boleh menggunakan framework atau headless CMS), dan ada sistem login.
- Gunakan JWT Auth untuk sistem login.




## Jawaban
## Soal 1
- Normalisasi database adalah proses pengelompokan atribut data yang membentuk entitas sederhana, nonredundant, fleksibel, dan mudah beradaptasi. Sehingga dapat dipastikan bahwa database yang dibuat berkualitas baik.
```
- Tabel sebelum di normalisasi
| Id | Judul              | Tahun | Jenis       | Penerbit     | Alamat Penerbit |
|----|--------------------|-------|-------------|--------------|-----------------|
| 1  | Pemrograman Golang | 2021  | Teknologi   | TechBooks    | 123 Tech Lane   |
| 2  | Belajar Vue.js     | 2020  | Pemrograman | WebDev Press | 456 Web Street  |
| 3  | Dasar-Dasar IoT    | 2019  | Teknologi   | FutureTech   | 789 Future Ave  |
| 4  | Pemrograman Python | 2018  | Pemrograman | Code Mastery | 321 Code Blvd   |
```
```
- Tabel sesudah di normalisasi dipecah menjadi 3 bagian
- Tabel Buku
| Id | Judul              | Tahun | idJenis | idPenerbit |
|----|--------------------|-------|---------|------------|
| 1  | Pemrograman Golang | 2021  | 1       | 1          |
| 2  | Belajar Vue.js     | 2020  | 2       | 2          |
| 3  | Dasar-Dasar IoT    | 2019  | 1       | 3          |
| 4  | Pemrograman Python | 2018  | 2       | 4          |
```
```
- Tabel Jenis Buku
| idJenis | jenis       |
|---------|-------------|
| 1       | Teknologi   |
| 2       | Pemrograman |
```
```
- Tabel Penerbit
| idPenerbit | penerbit     | alamatPenerbit |
|------------|--------------|----------------|
| 1          | TechBooks    | 123 Tech Lane  |
| 2          | WebDev Press | 456 Web Street |
| 3          | FutureTech   | 789 Future Ave |
| 4          | Code Mastery | 321 Code Blvd  |
```


## Soal 2 dan 3

Pertama buka terminal gitbash (**disarankan agar bisa jalankan script shell**) dan lakukan command dibawah:
```bash
git clone https://github.com/aribftap/Tes-Mini-Project.git
```
*Note lakukan perintah code . jika menggunakan IDE Visual Studio Code
```
code .
```

Sebelum menjalankan projek isi terlebih dahulu ubah .env_example menjadi .env pada folder backend

```env
DB_HOST=YOUR_HOST
DB_USER=YOUR_USER
DB_PASS=YOUR_PASSWORD
DB_NAME=YOUR_DATABASE
PORT=YOUR_PORT_SERVER
JWT_SECRET=YOUR_JWT_TOKEN
```
Kemudian import file SQL pada database berbasis SQL
```
db_perpustakaan.sql
```

## Jalankan Mini Project

```bash
chmod +x runner.sh
```

Kemudian jalankan shell
```bash
./runner.sh
```




