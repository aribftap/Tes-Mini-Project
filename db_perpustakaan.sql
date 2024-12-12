-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 12 Des 2024 pada 17.53
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_perpustakaan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `idBuku` int NOT NULL,
  `judulBuku` varchar(255) NOT NULL,
  `tahun` int NOT NULL,
  `idJenis` int DEFAULT NULL,
  `idPenerbit` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`idBuku`, `judulBuku`, `tahun`, `idJenis`, `idPenerbit`) VALUES
(1, 'Pemrograman Golang', 2021, 1, 1),
(2, 'Belajar Vue.js', 2020, 2, 2),
(3, 'Dasar-Dasar IoT', 2019, 1, 3),
(4, 'Pemrograman Python', 2018, 2, 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenisbuku`
--

CREATE TABLE `jenisbuku` (
  `idJenis` int NOT NULL,
  `jenis` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `jenisbuku`
--

INSERT INTO `jenisbuku` (`idJenis`, `jenis`) VALUES
(1, 'Teknologi'),
(2, 'Pemrograman');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penerbit`
--

CREATE TABLE `penerbit` (
  `idPenerbit` int NOT NULL,
  `penerbit` varchar(100) NOT NULL,
  `alamatPenerbit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `penerbit`
--

INSERT INTO `penerbit` (`idPenerbit`, `penerbit`, `alamatPenerbit`) VALUES
(1, 'TechBooks', '123 Tech Lane'),
(2, 'WebDev Press', '456 Web Street'),
(3, 'FutureTech', '789 Future Ave'),
(4, 'Code Mastery', '321 Code Blvd');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `idUser` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`idUser`, `username`, `password`, `email`) VALUES
(3, 'tes', '$2a$10$lE8a5KuU3AZWFcQM1i2pZeNURUXMrZ9phZBD1VitG.MK7ULPl/rga', 'tes@rteet.com');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`idBuku`),
  ADD KEY `idJenis` (`idJenis`),
  ADD KEY `idPenerbit` (`idPenerbit`);

--
-- Indeks untuk tabel `jenisbuku`
--
ALTER TABLE `jenisbuku`
  ADD PRIMARY KEY (`idJenis`);

--
-- Indeks untuk tabel `penerbit`
--
ALTER TABLE `penerbit`
  ADD PRIMARY KEY (`idPenerbit`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `buku`
--
ALTER TABLE `buku`
  MODIFY `idBuku` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `jenisbuku`
--
ALTER TABLE `jenisbuku`
  MODIFY `idJenis` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `penerbit`
--
ALTER TABLE `penerbit`
  MODIFY `idPenerbit` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`idJenis`) REFERENCES `jenisbuku` (`idJenis`),
  ADD CONSTRAINT `buku_ibfk_2` FOREIGN KEY (`idPenerbit`) REFERENCES `penerbit` (`idPenerbit`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
