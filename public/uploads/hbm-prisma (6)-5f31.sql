-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2021 at 06:02 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hbm-prisma`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id` int(11) NOT NULL,
  `kode_akun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipeId` int(11) NOT NULL,
  `nama_akun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategoriId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id`, `kode_akun`, `tipeId`, `nama_akun`, `kategoriId`) VALUES
(1, '1-10001', 1, 'Kas Besar (BCA 5255369137)', 3),
(2, '1-10002', 1, 'Kas Kecil', 3),
(3, '1-10003', 1, 'Kas USD', 3),
(4, '1-10004', 2, 'Bank (BCA 7570325889) IDR', 3),
(5, '1-10005', 2, 'Bank (BCA 7570392225) USD', 3),
(6, '1-10006', 2, 'Bank (Mandiri 118.000.392226.6) GIRO IDR', 3),
(7, '1-10007', 2, 'Bank (Mandiri 118.000.392225.8) GIRO USD', 3),
(8, '1-10008', 2, 'Bank (Mandiri 118.000.392228.2) TABUNGAN IDR', 3),
(9, '1-10009', 2, 'Bank (Mandiri 118.000.392227.4) TABUNGAN USD', 3),
(10, '1-10010', 2, 'Bank (BNI 0257569337) IDR', 3),
(11, '1-10011', 2, 'Bank (BTN 00014.01.30.0018261) GIRO IDR', 3),
(12, '1-10012', 2, 'Bank (Syariah Mandiri 7101183868) GIRO IDR', 3),
(13, '1-10013', 2, 'Bank (BJB Syariah 0080102004334) GIRO IDR', 3),
(14, '1-10014', 2, 'Bank (Permata 702215889) GIRO IDR', 3),
(15, '1-10015', 2, 'Bank (Mega 10300011001169) GIRO IDR', 3),
(16, '1-10016', 2, 'Bank (BRI 037901000926300) GIRO IDR', 3),
(17, '1-10017', 2, 'Bank (Syariah Bukopin 8802607106) GIRO IDR', 3),
(18, '1-10018', 3, 'Ayat Silang Kas/Bank', 3),
(19, '1-10019', 3, 'Ayat Silang Bank/Bank', 3),
(20, '1-10101', 4, 'Piutang PT. Bank Mandiri', 1),
(21, '1-10102', 4, 'Piutang PT. Rintis Sejahtera', 1),
(22, '1-10103', 4, 'Piutang The Royal Bank of Scotland', 1),
(23, '1-10104', 4, 'Piutang PT. Multimedia Global Starindo', 1),
(24, '1-10105', 4, 'Piutang PT. Bank Tabungan Negara', 1),
(25, '1-10106', 4, 'Piutang PT. Bank Negara Indonesia (Persero)', 1),
(26, '1-10107', 4, 'Piutang PT. Blue Power Technology', 1),
(27, '1-10108', 4, 'Piutang PT. Bank Syariah Mandiri', 1),
(28, '1-10109', 4, 'Piutang PT. Bank Permata', 1),
(29, '1-10110', 4, 'Piutang PT. BJB Syariah', 1),
(30, '1-10111', 4, 'Piutang PT. Bank Mega Tbk', 1),
(31, '1-10301', 5, 'Piutang Budi', 2),
(32, '1-10302', 5, 'Piutang Rekan Pak Roeddy, Ibu Dewi Sriyanti', 2),
(33, '1-10303', 5, 'Piutang Reka Pak Roeddy, Malika Silviani', 2),
(34, '1-10304', 5, 'Piutang Pak Roeddy, Kontraktor Anang', 2),
(35, '1-10305', 5, 'Piutang Dani', 2),
(36, '1-10306', 5, 'Piutang Yayasan', 2),
(37, '1-10307', 5, 'Piutang Frans', 2),
(38, '1-10308', 5, 'Piutang Hendra', 2),
(39, '1-10309', 5, 'Piutang Lifetech', 2),
(40, '1-10310', 5, 'Piutang Zegen', 2),
(41, '1-10311', 5, 'Piutang Henry', 2),
(42, '1-10312', 5, 'Piutang Sigit', 2),
(43, '1-10313', 5, 'Piutang Tarenjit', 2),
(44, '1-10314', 6, 'Piutang Bp. Roeddy Kasim', 2),
(45, '1-10315', 6, 'Piutang Lainnya (UM PPh 21)', 2),
(46, '1-10401', 7, 'Uang Muka Pembelian', 2),
(47, '1-10402', 7, 'Sewa dibayar dimuka', 2),
(48, '1-10403', 7, 'Asuransi dibayar dimuka', 2),
(49, '1-10404', 7, 'Uang Muka Pekerjaan Jasa', 2),
(50, '1-10405', 7, 'Uang Muka Lainnya', 2),
(51, '1-10406', 7, 'Uang Muka Pembelian - PT. Indo Internet', 2),
(52, '1-10407', 7, 'Uang Muka Pembelian - PT. Synnex Metrodata Indonesia', 2),
(53, '1-10408', 7, 'Uang Muka Pembelian - PT. ESQ', 2),
(54, '1-10409', 7, 'Uang Muka Pembelian - PT. BPC', 2),
(55, '1-10410', 7, 'Uang Muka Pembelian - PT. Eka Mas Republik', 2),
(56, '1-10501', 8, 'UM PPh 22', 2),
(57, '1-10502', 8, 'UM PPh 23', 2),
(58, '1-10503', 8, 'UM PPh 25', 2),
(59, '1-10504', 8, 'PPN Masukan', 2),
(60, '1-10505', 8, 'SPM PPN Jika LB', 2),
(61, '1-10506', 8, 'PPN Masukan - Belum Terealisasi', 2),
(62, '1-10507', 9, 'Beban dibayar dimuka', 2),
(63, '1-10601', 10, 'Tanah', 5),
(64, '1-10602', 10, 'Peralatan Kantor', 5),
(65, '1-10603', 10, 'Kendaraan', 5),
(66, '1-10604', 10, 'Mesin', 5),
(67, '1-10605', 10, 'Bangunan', 5),
(68, '1-10751', 11, 'Akumulasi Peny Peralatan Kantor', 7),
(69, '1-10752', 11, 'Akumulasi Peny Kendaraan', 7),
(70, '1-10753', 11, 'Akumulasi Peny Mesin', 7),
(71, '1-10754', 11, 'Akumulasi Peny Bangunan', 7),
(72, '1-10701', 11, 'Good Will', 6),
(73, '1-10702', 11, 'Bank Garansi', 6),
(74, '2-20101', 12, 'Utang Usaha', 8),
(75, '2-20102', 12, 'Utang Dividen', 8),
(76, '2-20103', 12, 'Utang Dagang Ke Synnex', 8),
(77, '2-20104', 12, 'Utang Dagang Ke SGK', 8),
(78, '2-20105', 12, 'Utang Dagang Ke Solmit', 8),
(79, '2-20106', 12, 'Utang Dagang Ke FirstMedia', 8),
(80, '2-20107', 12, 'Utang Dagang Ke Arthaloka', 8),
(81, '2-20108', 12, 'Utang Dagang Ke Jobstreet', 8),
(82, '2-20109', 12, 'Utang Dagang Ke Oracle', 8),
(83, '2-20110', 12, 'Utang Dagang Ke PSI', 8),
(84, '2-20111', 12, 'Utang Dagang Ke Delta Furindotama', 8),
(85, '2-20112', 12, 'Utang Dagang Ke ESQ', 8),
(86, '2-20113', 12, 'Utang Dagang Ke Wirecard', 8),
(87, '2-20114', 12, 'Utang Dagang Ke BPC', 8),
(88, '2-20115', 12, 'Utang Dagang Ke Damigo', 8),
(89, '2-20116', 12, 'Utang Dagang Ke Metalogic', 8),
(90, '2-20117', 12, 'Utang Dagang Ke Dinamika', 8),
(91, '2-20118', 12, 'Utang Dagang Ke Indonet', 8),
(92, '2-20119', 12, 'Utang Dagang Ke CV Tata Solusindo', 8),
(93, '2-20120', 12, 'Utang Dagang Ke PT. Synnex Indonesia', 8),
(94, '7-70001', 22, 'Pendapatan Bunga Bank Jasa Giro', 14),
(95, '7-70002', 22, 'Pendapatan Bunga Bank Jasa Deposito', 14),
(96, '7-70003', 22, 'Pendapatan Penjualan Barang', 14),
(97, '7-70004', 22, 'Pendapatan Bunga Bank', 14),
(98, '7-70005', 22, 'Pendatapan Lain-Lain', 14),
(99, '7-70006', 22, 'Pendapatan (Beban) Penghapusan Piutang dan/atau Hutang Dagang', 14),
(100, '7-70006', 22, 'Pendapatan (Beban) Penghapusan Piutang dan/atau Hutang Dagang', 14),
(101, '8-80001', 23, 'Biaya Bunga Bank Atas Pinjaman', 17),
(102, '8-80002', 23, 'Biaya Pajak Bunga Bank', 17),
(103, '8-80003', 23, 'Beban (Laba) Selisih Kurs', 17),
(104, '8-80101', 23, 'Biaya Taksiran Pajak Penghasilan', 17),
(105, '8-80102', 23, 'Pendapatan/Biaya Pajak Yang Ditangguhkan', 17),
(106, '8-80103', 23, 'Beban Adm. Bank', 17),
(107, '8-80199', 23, 'Beban Lainnya', 17),
(108, '8-80999', 23, 'Beban (Laba) Selisih Pembulatan', 17),
(109, '2-20501', 15, 'Utang Bp Roeddy Kasim', 10),
(110, '3-30001', 16, 'Modal Bpk Roeddy Kasim', 12),
(111, '3-30002', 16, 'Modal Ny Tjung Kim Ha', 12),
(112, '3-30003', 16, 'Modal Nn Lie Jan Pung', 12),
(113, '3-30101', 17, 'Laba/Rugi ditahan', 12),
(114, '3-30102', 17, 'Dividen', 12),
(115, '3-30103', 17, 'Laba/Rugi Tahun ditahan', 12),
(116, '4-40001', 18, 'Pendapatan Jasa', 13),
(117, '4-40002', 18, 'Pendapatan Penjualan Software', 13),
(118, '4-40003', 18, 'Pendapatan Penjualan Barang', 13),
(119, '4-40004', 18, 'Potongan Penjualan', 13),
(120, '4-40005', 18, 'Retur Penjualan', 13),
(121, '5-50001', 19, 'Pembelian License', 15),
(122, '5-50002', 19, 'Pembelian Perangkat Komputer', 15),
(123, '5-50003', 19, 'Pendapatan Penjualan Barang', 15),
(124, '5-50004', 19, 'Potongan Pembelian', 15),
(125, '5-50005', 19, 'HPP software', 15),
(126, '5-50006', 19, 'Pemakaian Jasa', 15),
(127, '5-50099', 19, 'HPP software', 15),
(128, '2-20301', 13, 'Utang PPh pasal 4 ayat 2', 10),
(129, '2-20302', 13, 'Utang PPh pasal 21', 10),
(130, '2-20303', 13, 'Utang PPh pasal 22', 10),
(131, '2-20304', 13, 'Utang PPh pasal 23', 10),
(132, '2-20305', 13, 'Utang PPh pasal 25/29', 10),
(133, '2-20306', 13, 'Utang PPh pasal 26', 10),
(134, '2-20307', 13, 'Utang PPN keluaran', 10),
(135, '2-20308', 13, 'SPM PPN', 10),
(136, '2-20309', 13, 'Utang PPh pasal 29', 10),
(137, '2-20310', 13, 'Utang PPN masuk LN', 10),
(138, '2-20401', 14, 'Utang Pinjaman', 11),
(139, '2-20402', 14, 'Utang Gaji', 10),
(140, '2-20403', 14, 'Utang YMD', 10),
(141, '2-20404', 14, 'Utang Biaya', 10),
(142, '2-20405', 14, 'Utang Bangunan Permanen', 10),
(143, '2-20406', 14, 'Utang BPJS', 10),
(144, '2-20407', 14, 'Utang Yayasan', 10),
(145, '6-60001', 20, 'Beban Iklan', 16),
(146, '6-60002', 20, 'Beban Komisi Penjualan', 16),
(147, '6-60003', 20, 'Beban Hadiah', 16),
(148, '6-60004', 20, 'Beban Penjualan Lainnya', 16),
(149, '6-60101', 21, 'Biaya Pemeliharan Bangunan & Prasarana Jasa', 16),
(150, '6-60102', 21, 'Biaya Pemeliharan Bangunan & Prasarana Material', 16),
(151, '6-60103', 21, 'Biaya Perbaikan & Perawatan Perabot Jasa', 16),
(152, '6-60104', 21, 'Biaya Perbaikan & Perawatan Perabot Material', 16),
(153, '6-60105', 21, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Jasa', 16),
(154, '6-60106', 21, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Material', 16),
(155, '6-60107', 21, 'Biaya Oli & Pelumas', 16),
(156, '6-60108', 21, 'Pemakaian Sparepart Kend & A.Berat', 16),
(157, '6-60109', 21, 'Biaya Gaji', 16),
(158, '6-60110', 21, 'Biaya Tunjangan Lainnya', 16),
(159, '6-60111', 21, 'Biaya JAMSOSTEK (BPJS)', 16),
(160, '6-60112', 21, 'Iuran Pensiun', 16),
(161, '6-60113', 21, 'Biaya Pengobatan', 16),
(162, '6-60114', 21, 'Biaya Jasa Internet', 16),
(163, '6-60115', 21, 'Biaya THR, Bonus, Liburan, dan Cuti ', 16),
(164, '6-60116', 21, 'Biaya Dana Pensiun Past Service Liab.', 16),
(165, '6-60117', 21, 'Biaya Pengobatan di Luar', 16),
(166, '6-60118', 21, 'Biaya Keamanan', 16),
(167, '6-60119', 21, 'Biaya Jasa Pengelolaan Tenaga Kerja', 16),
(168, '6-60120', 21, 'By Penggantian Pengelolaan Tenaga Kerja', 16),
(169, '6-60121', 21, 'Biaya Seragam & Perlengkapan Kerja', 16),
(170, '6-60122', 21, 'Biaya Pesangon', 16),
(171, '6-60123', 21, 'Biaya Tunjangan Perumahan', 16),
(172, '6-60124', 21, 'Biaya Air', 16),
(173, '6-60125', 21, 'Biaya Listrik', 16),
(174, '6-60126', 21, 'Biaya Gas', 16),
(175, '6-60127', 21, 'Biaya Asuransi', 16),
(176, '6-60128', 21, 'Biaya Asuransi Pengangkutan', 16),
(177, '6-60124', 21, 'Biaya Air', 16),
(178, '6-60125', 21, 'Biaya Listrik', 16),
(179, '6-60126', 21, 'Biaya Gas', 16),
(180, '6-60127', 21, 'Biaya Asuransi', 16),
(181, '6-60128', 21, 'Biaya Asuransi Pengangkutan', 16),
(182, '6-60124', 21, 'Biaya Air', 16),
(183, '6-60125', 21, 'Biaya Listrik', 16),
(184, '6-60126', 21, 'Biaya Gas', 16),
(185, '6-60127', 21, 'Biaya Asuransi', 16),
(186, '6-60128', 21, 'Biaya Asuransi Pengangkutan', 16),
(187, '6-60129', 21, 'Biaya Sewa Bangunan', 16),
(188, '6-60130', 21, 'Biaya Jasa Pergudangan', 16),
(189, '6-60131', 21, 'Biaya Sewa Peralatan', 16),
(190, '6-60132', 21, 'Biaya Sewa Lahan', 16),
(191, '6-60133', 21, 'Biaya Jasa Kurir / Forwarder', 16),
(192, '6-60134', 21, 'Biaya Jasa Pelayaran', 16),
(193, '6-60135', 21, 'Biaya Pajak Bumi dan Bangunan', 16),
(194, '6-60136', 21, 'Biaya Pajak Kendaraan Bermotor', 16),
(195, '6-60137', 21, 'Biaya Perizinan Pemerintah', 16),
(196, '6-60138', 21, 'Biaya Izin Tenaga Kerja', 16),
(197, '6-60132', 21, 'Biaya Sewa Lahan', 16),
(198, '6-60133', 21, 'Biaya Jasa Kurir / Forwarder', 16),
(199, '6-60134', 21, 'Biaya Jasa Pelayaran', 16),
(200, '6-60135', 21, 'Biaya Pajak Bumi dan Bangunan', 16),
(201, '6-60136', 21, 'Biaya Pajak Kendaraan Bermotor', 16),
(202, '6-60137', 21, 'Biaya Perizinan Pemerintah', 16),
(203, '6-60138', 21, 'Biaya Izin Tenaga Kerja', 16),
(204, '6-60139', 21, 'Biaya Transportasi Lokal', 16),
(205, '6-60140', 21, 'Biaya Perjalanan Dalam Negeri', 16),
(206, '6-60141', 21, 'Biaya Perjalanan Luar Negeri', 16),
(207, '6-60142', 21, 'Biaya Bahan Bakar', 16),
(208, '6-60143', 21, 'Biaya Mess', 16),
(209, '6-60144', 21, 'Biaya Jamuan / Representasi', 16),
(210, '6-60145', 21, 'Biaya Olahraga Dan Permainan', 16),
(211, '6-60146', 21, 'Biaya Olahraga Dan Permainan', 16),
(212, '6-60147', 21, 'Biaya Sumbangan Sosial', 16),
(213, '6-60148', 21, 'Biaya Makanan dan Minuman', 16),
(214, '6-60149', 21, 'Biaya Perayaan dan Upacara', 16),
(215, '6-60150', 21, 'Biaya Perlengkapan Kantor', 16),
(216, '6-60151', 21, 'Biaya Perlengkapan Fotocopy', 16),
(217, '6-60152', 21, 'Biaya Komunikasi', 16),
(218, '6-60153', 21, 'Biaya Organisasi Professional Internasional', 16),
(219, '6-60154', 21, 'Biaya Orgaanisasi Professional Nasional', 16),
(220, '6-60155', 21, 'Biaya Pelatihan External Pihak ke-3', 16),
(221, '6-60156', 21, 'Biaya Kursus Umum', 16),
(222, '6-60157', 21, 'Biaya Pelatihan Internal Kantor', 16),
(223, '6-60158', 21, 'Biaya Beasiswa', 16),
(224, '6-60159', 21, 'Biaya Pencarian Tenaga Kerja', 16),
(225, '6-60160', 21, 'Biaya Langgganan Buku, Jurnal, Koran,dan Lainnya', 16),
(226, '6-60161', 21, 'Biaya Konferensi Lokal', 16),
(227, '6-60162', 21, 'Biaya Konferensi di Luar Negeri', 16),
(228, '6-60163', 21, 'Biaya Konferensi Internal', 16),
(229, '6-60164', 21, 'Biaya Jasa Profesional', 16),
(230, '6-60165', 21, 'Biaya Jasa Notaris / Hukum', 16),
(231, '6-60166', 21, 'Biaya Perjalanan/Penggantian untuk Jasa Notaris/Hukum', 16),
(232, '6-60167', 21, 'Biaya Jasa Audit', 16),
(233, '6-60168', 21, 'Biaya Jasa Konsultan', 16),
(234, '6-60169', 21, 'Biaya Perjalanan/ Penggantian untuk Konsultan', 16),
(235, '6-60170', 21, 'Biaya Jasa Management', 16),
(236, '6-60171', 21, 'Beban Penyusutan Investaris Kantor', 16),
(237, '6-60172', 21, 'Beban Penyusutan Kendaraan', 16),
(238, '6-60173', 21, 'Beban Penyusutan Mesin', 16),
(239, '6-60174', 21, 'Beban Penyusutan Bangunan', 16),
(240, '6-60175', 21, 'Beban Amortisasi Penyusutan', 16),
(241, '6-60176', 21, 'Biaya Administrasi Bank', 16),
(242, '6-60177', 21, 'Biaya Dokumentasi', 16),
(243, '6-60178', 21, 'Biaya Umum dan Administrasi', 16),
(244, '6-60179', 21, 'Bebabn PPh 4 Ayat 2', 16),
(245, '6-60180', 21, 'Beban PPh 21', 16),
(246, '6-60181', 21, 'Beban PPh 23', 16),
(247, '6-60182', 21, 'Beban PPh 25', 16),
(248, '6-60183', 21, 'Beban PPh 26', 16),
(249, '6-60184', 21, 'Beban Denda Pajak', 16),
(250, '6-60185', 21, 'Biaya Materai', 16),
(251, '6-60186', 21, 'Biaya Dividen', 16),
(252, '6-60187', 21, 'Biaya Tender', 16),
(253, '6-60188', 21, 'Biaya Asosiasi', 16),
(254, '6-60189', 21, 'Biaya KTA dan KADIN', 16),
(255, '6-60190', 21, 'Biaya Entertain', 16),
(256, '6-60191', 21, 'Biaya Parkir', 16),
(257, '6-60192', 21, 'Beban PPh Tax Amnesty', 16),
(258, '6-60193', 21, 'Beban PPN', 16),
(259, '6-60194', 21, 'Beban Penghapusan Piutang Tak Tertagih', 16),
(260, '6-60195', 21, 'Biaya Komisi', 16),
(261, '6-60196', 21, 'Biaya Jasa Pelayaran', 16),
(262, '6-60197', 21, 'Biaya Pajak Bumi dan Bangunan', 16);

-- --------------------------------------------------------

--
-- Table structure for table `aset`
--

CREATE TABLE `aset` (
  `id` int(11) NOT NULL,
  `nama_aset` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_aset` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `akun_aset_id` int(11) NOT NULL,
  `deskripsi_aset` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_akuisisi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biaya_akuisisi` int(11) NOT NULL,
  `akun_dikreditkan_id` int(11) NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aset_non_depresiasi` tinyint(1) NOT NULL DEFAULT 0,
  `metode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `masa_manfaat` int(11) NOT NULL,
  `nilai_tahun` int(11) NOT NULL,
  `akun_penyusutan_id` int(11) NOT NULL,
  `akumulasi_akun_penyusutan_id` int(11) NOT NULL,
  `akumulasi_penyusutan` int(11) NOT NULL,
  `tgl_penyusutan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `terjual` tinyint(1) NOT NULL,
  `PIC` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detailbiaya`
--

CREATE TABLE `detailbiaya` (
  `id` int(11) NOT NULL,
  `header_biaya_id` int(11) NOT NULL,
  `akun_biaya_id` int(11) NOT NULL,
  `nama_akun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_id` int(11) NOT NULL,
  `pajak_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_akun_beli_id` int(11) NOT NULL,
  `pajak_persen` int(11) NOT NULL,
  `hasil_pajak` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jumlah2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailbiaya`
--

INSERT INTO `detailbiaya` (`id`, `header_biaya_id`, `akun_biaya_id`, `nama_akun`, `deskripsi`, `pajak_id`, `pajak_nama`, `pajak_akun_beli_id`, `pajak_persen`, `hasil_pajak`, `jumlah`, `jumlah2`) VALUES
(13, 5, 154, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Material', 'Desk1', 1, 'Pajak Jual Makanan (PJM)', 62, 10, 9000, 90000, 81000),
(14, 5, 150, 'Biaya Pemeliharan Bangunan & Prasarana Material', 'DEsk2', 5, 'Pajak Kenderaan Motor (PKM)', 41, 3, 15000, 500000, 485000),
(15, 6, 102, 'Biaya Pajak Bunga Bank', 'Desk1', 1, 'Pajak Jual Makanan (PJM)', 62, 10, 5500, 55000, 49500),
(16, 6, 153, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Jasa', 'Desk2', 2, 'Pajak Minuman (PM)', 58, 5, 450, 9000, 8550),
(17, 6, 180, 'Biaya Asuransi', 'Desk3', 4, 'Pajak Pemakaian Jasa (PPJ)', 95, 12, 9120, 76000, 66880),
(18, 7, 101, 'Biaya Bunga Bank Atas Pinjaman', '-', 5, 'Pajak Kenderaan Motor (PKM)', 41, 3, 2970, 99000, 96030),
(19, 7, 154, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Material', 'kosong', 1, 'Pajak Jual Makanan (PJM)', 62, 10, 89000, 890000, 801000),
(20, 7, 153, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Jasa', 'kosong', 5, 'Pajak Kenderaan Motor (PKM)', 41, 3, 450, 15000, 14550),
(21, 8, 102, 'Biaya Pajak Bunga Bank', '-', 5, 'Pajak Kenderaan Motor (PKM)', 41, 3, 42000, 1400000, 1358000),
(22, 8, 153, 'By Pemeliharaan Kend,A.Berat,Mesin-Pihak3 Jasa', 'kosong', 2, 'Pajak Minuman (PM)', 58, 5, 4000, 80000, 76000),
(23, 9, 107, 'Beban Lainnya', 'Desk1', 5, 'Pajak Kenderaan Motor (PKM)', 41, 3, 4200, 140000, 135800),
(24, 10, 106, 'Beban Adm. Bank', '-', 4, 'Pajak Pemakaian Jasa (PPJ)', 95, 12, 68146, 567890, 499743);

-- --------------------------------------------------------

--
-- Table structure for table `detailjurnal`
--

CREATE TABLE `detailjurnal` (
  `id` int(11) NOT NULL,
  `header_jurnal_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `debit` int(11) NOT NULL,
  `kredit` int(11) NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailjurnal`
--

INSERT INTO `detailjurnal` (`id`, `header_jurnal_id`, `akun_id`, `debit`, `kredit`, `deskripsi`, `tag`, `nominal`, `tipe_saldo`) VALUES
(8, 3, 70, 55000, 0, '1 Box isi 20 pcs', 'KOR', 55000, 'Debit'),
(9, 3, 68, 0, 50000, '', '', 50000, 'Kebit'),
(10, 3, 68, 8000, 0, '', '', 8000, 'Debit'),
(11, 3, 68, 0, 50000, '', '', 50000, 'Kebit'),
(12, 3, 48, 37000, 0, '', '', 37000, 'Debit'),
(13, 4, 69, 25000, 0, '-', '-', 25000, 'Debit'),
(14, 4, 19, 0, 98000, '', '', 98000, 'Kredit'),
(15, 4, 10, 43000, 0, '', '', 43000, 'Debit'),
(16, 4, 68, 30000, 0, '', '', 30000, 'Debit');

-- --------------------------------------------------------

--
-- Table structure for table `detailkirimuang`
--

CREATE TABLE `detailkirimuang` (
  `id` int(11) NOT NULL,
  `header_kirim_uang_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nama_akun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_id` int(11) NOT NULL,
  `pajak_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_persen` int(11) NOT NULL,
  `hasil_pajak` int(11) NOT NULL,
  `pajak_beli_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jumlah2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailkirimuang`
--

INSERT INTO `detailkirimuang` (`id`, `header_kirim_uang_id`, `akun_id`, `nama_akun`, `deskripsi`, `pajak_id`, `pajak_nama`, `pajak_persen`, `hasil_pajak`, `pajak_beli_id`, `jumlah`, `jumlah2`) VALUES
(3, 2, 20, 'Piutang PT. Bank Mandiri', '1111', 2, 'Pajak Minuman (PM)', 5, 2250, 58, 45000, 42750),
(4, 2, 86, 'Utang Dagang Ke Wirecard', '2222', 4, 'Pajak Pemakaian Jasa (PPJ)', 12, 94680, 95, 789000, 694320),
(5, 3, 99, 'Pendapatan (Beban) Penghapusan Piutang dan/atau Hutang Dagang', '-', 1, 'Pajak Jual Makanan (PJM)', 10, 10000, 62, 100000, 90000);

-- --------------------------------------------------------

--
-- Table structure for table `detailpembelian`
--

CREATE TABLE `detailpembelian` (
  `id` int(11) NOT NULL,
  `header_pembelian_id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `nama_produk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desk_produk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `satuan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `hasil_diskon` int(11) NOT NULL,
  `pajak_id` int(11) NOT NULL,
  `pajak_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_beli_id` int(11) NOT NULL,
  `pajak_persen` int(11) NOT NULL,
  `hasil_pajak` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailpembelian`
--

INSERT INTO `detailpembelian` (`id`, `header_pembelian_id`, `produk_id`, `nama_produk`, `desk_produk`, `kuantitas`, `satuan`, `harga_satuan`, `diskon`, `hasil_diskon`, `pajak_id`, `pajak_nama`, `pajak_beli_id`, `pajak_persen`, `hasil_pajak`, `jumlah`) VALUES
(1, 1, 8, 'Kopi Luwak', '1 box isi 50 sachet', 1, 'box', 40000, 10, 4000, 3, 'Pajak Bank Mandiri', 45, 8, 3200, 40000),
(2, 1, 3, 'Frozen Beef Wagyu A5', '1 pcs berat sekitar 500gr', 1, 'pcs', 1200000, 5, 60000, 2, 'Pajak Minuman (PM)', 58, 5, 60000, 1200000),
(3, 2, 6, 'Mouse Logitech G102', '-', 1, 'biji', 140000, 10, 14000, 3, 'Pajak Bank Mandiri', 45, 8, 11200, 140000),
(4, 3, 6, 'Mouse Logitech G102', '-', 10, 'biji', 140000, 10, 140000, 1, 'KOSONG', 99, 0, 0, 1400000);

-- --------------------------------------------------------

--
-- Table structure for table `detailpenjualan`
--

CREATE TABLE `detailpenjualan` (
  `id` int(11) NOT NULL,
  `header_penjualan_id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `nama_produk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desk_produk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `satuan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga_satuan` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `hasil_diskon` int(11) NOT NULL,
  `pajak_id` int(11) NOT NULL,
  `pajak_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_jual_id` int(11) NOT NULL,
  `pajak_persen` int(11) NOT NULL,
  `hasil_pajak` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailpenjualan`
--

INSERT INTO `detailpenjualan` (`id`, `header_penjualan_id`, `produk_id`, `nama_produk`, `desk_produk`, `kuantitas`, `satuan`, `harga_satuan`, `diskon`, `hasil_diskon`, `pajak_id`, `pajak_nama`, `pajak_jual_id`, `pajak_persen`, `hasil_pajak`, `jumlah`) VALUES
(13, 6, 2, 'Lays rasa Salmon Teriyaki', '1 box isi 2 lusin', 1, 'box', 320000, 10, 32000, 3, 'Pajak Bank Mandiri', 102, 8, 25600, 320000),
(14, 6, 5, 'Monitor LG 24inch', '', 1, 'biji', 1500000, 10, 150000, 1, 'KOSONG', 108, 0, 0, 1500000),
(15, 6, 4, 'Aqua Galon 20L', '-', 1, 'buah', 35000, 5, 1750, 4, 'Pajak Pemakaian Jasa (PPJ)', 105, 12, 4200, 35000),
(16, 7, 5, 'Monitor LG 24inch', '', 4, 'biji', 1500000, 10, 600000, 3, 'Pajak Bank Mandiri', 102, 8, 480000, 6000000),
(17, 8, 7, 'Fruity Blackcurrant', '1 box isi 20 pcs', 16, 'box', 110000, 10, 176000, 2, 'Pajak Minuman (PM)', 107, 5, 88000, 1760000),
(18, 8, 4, 'Aqua Galon 20L', '-', 7, 'buah', 35000, 10, 24500, 2, 'Pajak Minuman (PM)', 107, 5, 12250, 245000),
(19, 9, 3, 'Frozen Beef Wagyu A5', '1 pcs berat sekitar 500gr', 5, 'pcs', 2000000, 10, 1000000, 2, 'Pajak Minuman (PM)', 107, 5, 500000, 10000000);

-- --------------------------------------------------------

--
-- Table structure for table `detailreimburse`
--

CREATE TABLE `detailreimburse` (
  `id` int(11) NOT NULL,
  `header_reimburse_id` int(11) NOT NULL,
  `tanggal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biaya` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL,
  `keterangan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailreimburse`
--

INSERT INTO `detailreimburse` (`id`, `header_reimburse_id`, `tanggal`, `tempat`, `biaya`, `jumlah`, `keterangan`) VALUES
(1, 3, '2021-09-06', 'Parkir', 'Parkir', 5000, '-'),
(2, 3, '2021-09-10', 'Parkir', 'Parkir', 9000, '-'),
(3, 3, '2021-09-20', 'Admin', 'Admin', 15000, 'Admin BCA Bulanan'),
(4, 4, '2021-09-01', 'Parkir', 'Parkir', 4000, '-'),
(5, 4, '2021-09-07', 'Makan Clien', 'Makan Clien', 200000, '-'),
(6, 4, '2021-09-16', 'Toll', 'Toll', 7500, '-'),
(7, 5, '2021-09-04', '-', 'Parkir Mobil', 10000, '-'),
(8, 5, '2021-09-05', '-', 'Pulpen Kantor', 15000, '-'),
(9, 5, '2021-09-07', '-', 'Toll', 7500, 'Toll Alam Sutera - Grogol'),
(10, 5, '2021-09-15', '-', 'Admin BCA', 12000, '-');

-- --------------------------------------------------------

--
-- Table structure for table `detailsaldoawal`
--

CREATE TABLE `detailsaldoawal` (
  `id` int(11) NOT NULL,
  `header_saldo_awal_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `debit` int(11) NOT NULL,
  `kredit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailsaldoawal`
--

INSERT INTO `detailsaldoawal` (`id`, `header_saldo_awal_id`, `akun_id`, `debit`, `kredit`) VALUES
(2097, 9, 1, 14000000, 0),
(2098, 9, 2, 14000000, 0),
(2099, 9, 3, 14000000, 0),
(2100, 9, 4, 14000000, 0),
(2101, 9, 5, 14000000, 0),
(2102, 9, 6, 14000000, 0),
(2103, 9, 7, 14000000, 0),
(2104, 9, 8, 14000000, 0),
(2105, 9, 9, 14000000, 0),
(2106, 9, 10, 14000000, 0),
(2107, 9, 11, 14000000, 0),
(2108, 9, 12, 14000000, 0),
(2109, 9, 13, 14000000, 0),
(2110, 9, 14, 14000000, 0),
(2111, 9, 15, 14000000, 0),
(2112, 9, 16, 14000000, 0),
(2113, 9, 17, 14000000, 0),
(2114, 9, 18, 14000000, 0),
(2115, 9, 19, 14000000, 0),
(2116, 9, 20, 14000000, 0),
(2117, 9, 21, 14000000, 0),
(2118, 9, 22, 14000000, 0),
(2119, 9, 23, 14000000, 0),
(2120, 9, 24, 14000000, 0),
(2121, 9, 25, 14000000, 0),
(2122, 9, 26, 14000000, 0),
(2123, 9, 27, 14000000, 0),
(2124, 9, 28, 14000000, 0),
(2125, 9, 29, 14000000, 0),
(2126, 9, 30, 14000000, 0),
(2127, 9, 31, 14000000, 0),
(2128, 9, 32, 14000000, 0),
(2129, 9, 33, 14000000, 0),
(2130, 9, 34, 14000000, 0),
(2131, 9, 35, 14000000, 0),
(2132, 9, 36, 14000000, 0),
(2133, 9, 37, 14000000, 0),
(2134, 9, 38, 14000000, 0),
(2135, 9, 39, 14000000, 0),
(2136, 9, 40, 14000000, 0),
(2137, 9, 41, 14000000, 0),
(2138, 9, 42, 14000000, 0),
(2139, 9, 43, 14000000, 0),
(2140, 9, 44, 14000000, 0),
(2141, 9, 45, 14000000, 0),
(2142, 9, 46, 14000000, 0),
(2143, 9, 47, 14000000, 0),
(2144, 9, 48, 14000000, 0),
(2145, 9, 49, 14000000, 0),
(2146, 9, 50, 14000000, 0),
(2147, 9, 51, 14000000, 0),
(2148, 9, 52, 14000000, 0),
(2149, 9, 53, 14000000, 0),
(2150, 9, 54, 14000000, 0),
(2151, 9, 55, 14000000, 0),
(2152, 9, 56, 14000000, 0),
(2153, 9, 57, 14000000, 0),
(2154, 9, 58, 14000000, 0),
(2155, 9, 59, 14000000, 0),
(2156, 9, 60, 14000000, 0),
(2157, 9, 61, 14000000, 0),
(2158, 9, 62, 14000000, 0),
(2159, 9, 63, 14000000, 0),
(2160, 9, 64, 14000000, 0),
(2161, 9, 65, 14000000, 0),
(2162, 9, 66, 14000000, 0),
(2163, 9, 67, 14000000, 0),
(2164, 9, 72, 14000000, 0),
(2165, 9, 73, 14000000, 0),
(2166, 9, 68, 14000000, 0),
(2167, 9, 69, 14000000, 0),
(2168, 9, 70, 14000000, 0),
(2169, 9, 71, 14000000, 0),
(2170, 9, 74, 0, 14000000),
(2171, 9, 75, 0, 14000000),
(2172, 9, 76, 0, 14000000),
(2173, 9, 77, 0, 14000000),
(2174, 9, 78, 0, 14000000),
(2175, 9, 79, 0, 14000000),
(2176, 9, 80, 0, 14000000),
(2177, 9, 81, 0, 14000000),
(2178, 9, 82, 0, 14000000),
(2179, 9, 83, 0, 14000000),
(2180, 9, 84, 0, 14000000),
(2181, 9, 85, 0, 14000000),
(2182, 9, 86, 0, 14000000),
(2183, 9, 87, 0, 14000000),
(2184, 9, 88, 0, 14000000),
(2185, 9, 89, 0, 14000000),
(2186, 9, 90, 0, 14000000),
(2187, 9, 91, 0, 14000000),
(2188, 9, 92, 0, 14000000),
(2189, 9, 93, 0, 14000000),
(2190, 9, 128, 0, 14000000),
(2191, 9, 129, 0, 14000000),
(2192, 9, 130, 0, 14000000),
(2193, 9, 131, 0, 14000000),
(2194, 9, 132, 0, 14000000),
(2195, 9, 133, 0, 14000000),
(2196, 9, 134, 0, 14000000),
(2197, 9, 135, 0, 14000000),
(2198, 9, 136, 0, 14000000),
(2199, 9, 137, 0, 14000000),
(2200, 9, 138, 0, 14000000),
(2201, 9, 139, 0, 14000000),
(2202, 9, 140, 0, 14000000),
(2203, 9, 141, 0, 14000000),
(2204, 9, 142, 0, 14000000),
(2205, 9, 143, 0, 14000000),
(2206, 9, 144, 0, 14000000),
(2207, 9, 109, 0, 14000000),
(2208, 9, 110, 0, 14000000),
(2209, 9, 111, 0, 14000000),
(2210, 9, 112, 0, 14000000),
(2211, 9, 113, 0, 14000000),
(2212, 9, 114, 0, 14000000),
(2213, 9, 115, 0, 14000000),
(2214, 9, 116, 0, 14000000),
(2215, 9, 117, 0, 14000000),
(2216, 9, 118, 0, 14000000),
(2217, 9, 119, 0, 14000000),
(2218, 9, 120, 0, 14000000),
(2219, 9, 121, 14000000, 0),
(2220, 9, 122, 14000000, 0),
(2221, 9, 123, 14000000, 0),
(2222, 9, 124, 14000000, 0),
(2223, 9, 125, 14000000, 0),
(2224, 9, 126, 14000000, 0),
(2225, 9, 127, 14000000, 0),
(2226, 9, 145, 14000000, 0),
(2227, 9, 146, 14000000, 0),
(2228, 9, 147, 14000000, 0),
(2229, 9, 148, 14000000, 0),
(2230, 9, 149, 14000000, 0),
(2231, 9, 150, 14000000, 0),
(2232, 9, 151, 14000000, 0),
(2233, 9, 152, 14000000, 0),
(2234, 9, 153, 14000000, 0),
(2235, 9, 154, 14000000, 0),
(2236, 9, 155, 14000000, 0),
(2237, 9, 156, 14000000, 0),
(2238, 9, 157, 14000000, 0),
(2239, 9, 158, 14000000, 0),
(2240, 9, 159, 14000000, 0),
(2241, 9, 160, 14000000, 0),
(2242, 9, 161, 14000000, 0),
(2243, 9, 162, 14000000, 0),
(2244, 9, 163, 14000000, 0),
(2245, 9, 164, 14000000, 0),
(2246, 9, 165, 14000000, 0),
(2247, 9, 166, 14000000, 0),
(2248, 9, 167, 14000000, 0),
(2249, 9, 168, 14000000, 0),
(2250, 9, 169, 14000000, 0),
(2251, 9, 170, 14000000, 0),
(2252, 9, 171, 14000000, 0),
(2253, 9, 172, 14000000, 0),
(2254, 9, 177, 14000000, 0),
(2255, 9, 182, 14000000, 0),
(2256, 9, 173, 14000000, 0),
(2257, 9, 178, 14000000, 0),
(2258, 9, 183, 14000000, 0),
(2259, 9, 174, 14000000, 0),
(2260, 9, 179, 14000000, 0),
(2261, 9, 184, 14000000, 0),
(2262, 9, 175, 14000000, 0),
(2263, 9, 180, 14000000, 0),
(2264, 9, 185, 14000000, 0),
(2265, 9, 176, 14000000, 0),
(2266, 9, 181, 14000000, 0),
(2267, 9, 186, 14000000, 0),
(2268, 9, 187, 14000000, 0),
(2269, 9, 188, 14000000, 0),
(2270, 9, 189, 14000000, 0),
(2271, 9, 190, 14000000, 0),
(2272, 9, 197, 14000000, 0),
(2273, 9, 191, 14000000, 0),
(2274, 9, 198, 14000000, 0),
(2275, 9, 192, 14000000, 0),
(2276, 9, 199, 14000000, 0),
(2277, 9, 193, 14000000, 0),
(2278, 9, 200, 14000000, 0),
(2279, 9, 194, 14000000, 0),
(2280, 9, 201, 14000000, 0),
(2281, 9, 195, 14000000, 0),
(2282, 9, 202, 14000000, 0),
(2283, 9, 196, 14000000, 0),
(2284, 9, 203, 14000000, 0),
(2285, 9, 204, 14000000, 0),
(2286, 9, 205, 14000000, 0),
(2287, 9, 206, 14000000, 0),
(2288, 9, 207, 14000000, 0),
(2289, 9, 208, 14000000, 0),
(2290, 9, 209, 14000000, 0),
(2291, 9, 210, 14000000, 0),
(2292, 9, 211, 14000000, 0),
(2293, 9, 212, 14000000, 0),
(2294, 9, 213, 14000000, 0),
(2295, 9, 214, 14000000, 0),
(2296, 9, 215, 14000000, 0),
(2297, 9, 216, 14000000, 0),
(2298, 9, 217, 14000000, 0),
(2299, 9, 218, 14000000, 0),
(2300, 9, 219, 14000000, 0),
(2301, 9, 220, 14000000, 0),
(2302, 9, 221, 14000000, 0),
(2303, 9, 222, 14000000, 0),
(2304, 9, 223, 14000000, 0),
(2305, 9, 224, 14000000, 0),
(2306, 9, 225, 14000000, 0),
(2307, 9, 226, 14000000, 0),
(2308, 9, 227, 14000000, 0),
(2309, 9, 228, 14000000, 0),
(2310, 9, 229, 14000000, 0),
(2311, 9, 230, 14000000, 0),
(2312, 9, 231, 14000000, 0),
(2313, 9, 232, 14000000, 0),
(2314, 9, 233, 14000000, 0),
(2315, 9, 234, 14000000, 0),
(2316, 9, 235, 14000000, 0),
(2317, 9, 236, 14000000, 0),
(2318, 9, 237, 14000000, 0),
(2319, 9, 238, 14000000, 0),
(2320, 9, 239, 14000000, 0),
(2321, 9, 240, 14000000, 0),
(2322, 9, 241, 14000000, 0),
(2323, 9, 242, 14000000, 0),
(2324, 9, 243, 14000000, 0),
(2325, 9, 244, 14000000, 0),
(2326, 9, 245, 14000000, 0),
(2327, 9, 246, 14000000, 0),
(2328, 9, 247, 14000000, 0),
(2329, 9, 248, 14000000, 0),
(2330, 9, 249, 14000000, 0),
(2331, 9, 250, 14000000, 0),
(2332, 9, 251, 14000000, 0),
(2333, 9, 252, 14000000, 0),
(2334, 9, 253, 14000000, 0),
(2335, 9, 254, 14000000, 0),
(2336, 9, 255, 14000000, 0),
(2337, 9, 256, 14000000, 0),
(2338, 9, 257, 14000000, 0),
(2339, 9, 258, 14000000, 0),
(2340, 9, 259, 14000000, 0),
(2341, 9, 260, 14000000, 0),
(2342, 9, 261, 14000000, 0),
(2343, 9, 262, 14000000, 0),
(2344, 9, 94, 0, 14000000),
(2345, 9, 95, 0, 14000000),
(2346, 9, 96, 0, 14000000),
(2347, 9, 97, 0, 14000000),
(2348, 9, 98, 0, 14000000),
(2349, 9, 99, 0, 14000000),
(2350, 9, 100, 0, 14000000),
(2351, 9, 101, 14000000, 0),
(2352, 9, 102, 14000000, 0),
(2353, 9, 103, 14000000, 0),
(2354, 9, 104, 14000000, 0),
(2355, 9, 105, 14000000, 0),
(2356, 9, 106, 14000000, 0),
(2357, 9, 107, 14000000, 0),
(2358, 9, 108, 14000000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `detailterimauang`
--

CREATE TABLE `detailterimauang` (
  `id` int(11) NOT NULL,
  `header_terima_uang_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nama_akun` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_id` int(11) NOT NULL,
  `pajak_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pajak_persen` int(11) NOT NULL,
  `hasil_pajak` int(11) NOT NULL,
  `pajak_jual_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `jumlah2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detailterimauang`
--

INSERT INTO `detailterimauang` (`id`, `header_terima_uang_id`, `akun_id`, `nama_akun`, `deskripsi`, `pajak_id`, `pajak_nama`, `pajak_persen`, `hasil_pajak`, `pajak_jual_id`, `jumlah`, `jumlah2`) VALUES
(3, 2, 23, 'Piutang PT. Multimedia Global Starindo', 'Desk1', 2, 'Pajak Minuman (PM)', 5, 2250, 107, 45000, 42750),
(4, 2, 35, 'Piutang Dani', 'sadsadada', 2, 'Pajak Minuman (PM)', 5, 25000, 107, 500000, 475000),
(5, 3, 35, 'Piutang Dani', 'Desk1', 2, 'Pajak Minuman (PM)', 5, 2250, 107, 45000, 42750);

-- --------------------------------------------------------

--
-- Table structure for table `headerbiaya`
--

CREATE TABLE `headerbiaya` (
  `id` int(11) NOT NULL,
  `akun_kas_bank` int(11) NOT NULL,
  `nama_penerima` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cara_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `alamat_penagihan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileattachment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` int(11) NOT NULL,
  `akun_pemotongan` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `pemotongan` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sisa_tagihan` int(11) NOT NULL,
  `change_view` tinyint(1) NOT NULL,
  `total_pajak_per_baris` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerbiaya`
--

INSERT INTO `headerbiaya` (`id`, `akun_kas_bank`, `nama_penerima`, `tgl_transaksi`, `cara_pembayaran`, `no_transaksi`, `alamat_penagihan`, `tag`, `memo`, `fileattachment`, `subtotal`, `akun_pemotongan`, `total`, `pemotongan`, `status`, `sisa_tagihan`, `change_view`, `total_pajak_per_baris`) VALUES
(5, 6, 4, '2021-09-16', '30', 5, '1159, 경남, 양산시, 중부동, 140-11', '1/1', 'sdsada', 'req.file.filename', 590000, 118, 614000, 54400, 'Partial', 540000, 1, 24000),
(6, 8, 4, '2021-09-17', '15 Hari', 6, '1159, 경남, 양산시, 중부동, 140-11', '1/1', 'tak ade memo', 'req.file.filename', 140000, 117, 155070, 5070, 'Partial', 125000, 1, 15070),
(7, 5, 8, '2021-09-08', '1 Minggu', 7, '115-11, Uchiri, Samseo-myeon, Jangseong-gun, Jeollanam-do', '-', '', 'req.file.filename', 911580, 119, 1004000, 0, 'Active', 1004000, 1, 92420),
(8, 7, 1, '2021-09-11', '60 Hari', 8, '1312, 경남, 양산시, 양산우체국사서함, 226-4', '-', '', 'req.file.filename', 1480000, 118, 1526000, 5000, 'Complete', 0, 1, 46000),
(9, 14, 7, '2021-09-10', '15 Hari', 9, '264-4, Banyongri, Chukdong-myeon, Sacheon-si, Gyeongsangnam-do', '1/1', '', 'req.file.filename', 135800, 117, 140000, 0, 'Partial', 88000, 1, 4200),
(10, 8, 6, '2021-09-17', 'Tunai/Cash', 10, '164-5, Gyeongdong 2(i)-ga, Mokpo-si, Jeollanam-do', '-', '-', 'req.file.filename', 499743, 118, 567890, 5000, 'Active', 562890, 1, 68146);

-- --------------------------------------------------------

--
-- Table structure for table `headerjurnal`
--

CREATE TABLE `headerjurnal` (
  `id` int(11) NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_debit` int(11) NOT NULL,
  `total_kredit` int(11) NOT NULL,
  `lampiran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerjurnal`
--

INSERT INTO `headerjurnal` (`id`, `no_transaksi`, `tgl_transaksi`, `total_debit`, `total_kredit`, `lampiran`) VALUES
(3, 1, '2021-09-18', 100000, 100000, 'hbm-prisma (5)-b3d0.sql'),
(4, 4, '2021-09-17', 98000, 98000, 'hbm-prisma (2)-0ac1.sql');

-- --------------------------------------------------------

--
-- Table structure for table `headerkirimuang`
--

CREATE TABLE `headerkirimuang` (
  `id` int(11) NOT NULL,
  `akun_bayar_id` int(11) NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_attachment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` int(11) NOT NULL,
  `pajak` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerkirimuang`
--

INSERT INTO `headerkirimuang` (`id`, `akun_bayar_id`, `no_transaksi`, `tgl_transaksi`, `tag`, `memo`, `file_attachment`, `subtotal`, `pajak`, `total`, `status`, `kontak_id`) VALUES
(2, 10, 1, '2021-09-11', '1/1', 'aaa', ' req.file.filename', 834000, 96930, 930930, 'Sudah Terekonsilisasi', 4),
(3, 10, 3, '2021-09-10', '-', 'ff', ' req.file.filename', 100000, 10000, 110000, 'Sudah Terekonsilisasi', 2);

-- --------------------------------------------------------

--
-- Table structure for table `headerpembelian`
--

CREATE TABLE `headerpembelian` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `nama_supplier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_supplier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_jatuh_tempo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `syarat_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_ref_penagihan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_attachment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` int(11) NOT NULL,
  `total_diskon_per_baris` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `total_diskon` int(11) NOT NULL,
  `total_pajak_per_baris` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pemotongan` int(11) NOT NULL,
  `pemotongan_total` int(11) NOT NULL,
  `akun_pemotongan` int(11) NOT NULL,
  `uang_muka` int(11) NOT NULL,
  `akun_uang_muka` int(11) NOT NULL,
  `sisa_tagihan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerpembelian`
--

INSERT INTO `headerpembelian` (`id`, `kontak_id`, `nama_supplier`, `email`, `alamat_supplier`, `tgl_transaksi`, `tgl_jatuh_tempo`, `syarat_pembayaran`, `no_ref_penagihan`, `no_transaksi`, `tag`, `pesan`, `memo`, `file_attachment`, `subtotal`, `total_diskon_per_baris`, `diskon`, `total_diskon`, `total_pajak_per_baris`, `total`, `status`, `pemotongan`, `pemotongan_total`, `akun_pemotongan`, `uang_muka`, `akun_uang_muka`, `sisa_tagihan`) VALUES
(1, 5, '5', 'mike@gmail.com', '1309, 서울, 노원구, 하계2동, 극동아파트, 3-3', '2021-09-16', '2021-09-16', '0', 'SHIBA-135', 1, '1/1', '', '', '111-78fd.PNG', 1240000, 64000, 10, 124000, 63200, 1115200, 'Complete', 115200, 1000000, 118, 150000, 12, 0),
(2, 6, '6', 'kevinqyan@gmail.com', '164-5, Gyeongdong 2(i)-ga, Mokpo-si, Jeollanam-do', '2021-09-04', '2021-10-04', '30', 'CAKE-15', 2, '-', '-', '-', '111-a104.PNG', 140000, 14000, 10, 14000, 11200, 123200, 'Partial', 5000, 118200, 117, 8200, 17, 80000),
(3, 2, '2', 'roseannepark@gmail.com', '172-1, Gamjeon-dong, Sasang-gu, Busan', '2021-08-08', '2021-08-15', '7', 'GKPO-1551', 3, '2/4', '-', '-', 'f00bf238b5-b3eb.jpg', 1400000, 140000, 10, 140000, 0, 1120000, 'Active', 5000, 1115000, 118, 325000, 14, 790000);

-- --------------------------------------------------------

--
-- Table structure for table `headerpenjualan`
--

CREATE TABLE `headerpenjualan` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `nama_supplier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_supplier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_jatuh_tempo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `syarat_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_ref_penagihan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_attachment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` int(11) NOT NULL,
  `total_diskon_per_baris` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `total_diskon` int(11) NOT NULL,
  `total_pajak_per_baris` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `pemotongan` int(11) NOT NULL,
  `pemotongan_total` int(11) NOT NULL,
  `akun_pemotongan` int(11) NOT NULL,
  `uang_muka` int(11) NOT NULL,
  `akun_uang_muka` int(11) NOT NULL,
  `sisa_tagihan` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_kontrak` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerpenjualan`
--

INSERT INTO `headerpenjualan` (`id`, `kontak_id`, `nama_supplier`, `email`, `alamat_supplier`, `tgl_transaksi`, `tgl_jatuh_tempo`, `syarat_pembayaran`, `no_ref_penagihan`, `no_transaksi`, `tag`, `pesan`, `memo`, `file_attachment`, `subtotal`, `total_diskon_per_baris`, `diskon`, `total_diskon`, `total_pajak_per_baris`, `total`, `balance`, `pemotongan`, `pemotongan_total`, `akun_pemotongan`, `uang_muka`, `akun_uang_muka`, `sisa_tagihan`, `status`, `tgl_kontrak`) VALUES
(6, 3, '3', 'kimjisoo@gmail.com', '1229, 강원, 강릉시, 사천면, 사천진리, 228-4', '2021-09-09', '2021-09-03', '30', 'BCAU-6015', 6, '1', 'tdk', 'tdk', '111-cf0f.PNG', 1855000, 183750, 10, 185500, 29800, 1515550, 1884800, 5000, 1510550, 116, 10550, 17, 1450000, 'Partial', ''),
(7, 3, '3', 'kimjisoo@gmail.com', '1229, 강원, 강릉시, 사천면, 사천진리, 228-4', '2021-09-10', '2021-09-17', '7', 'VMK-5910', 7, '1/15', '-', '-', 'f00bf238b5-7453.jpg', 6000000, 600000, 10, 600000, 480000, 5280000, 6480000, 5000, 5275000, 117, 500000, 17, 4775000, 'Active', '2021-09-17'),
(8, 3, '3', 'kimjisoo@gmail.com', '1229, 강원, 강릉시, 사천면, 사천진리, 228-4', '2021-08-29', '2021-08-30', '0', 'BCA-1295', 8, 'FGA-12409', '-', '-', 'f00bf238b5-c506.jpg', 2005000, 200500, 5, 100250, 100250, 1804500, 2105250, 5000, 1799500, 118, 340000, 17, 1459500, 'Active', '2021-09-10'),
(9, 1, '1', 'jenniekim@gmail.com', '1312, 경남, 양산시, 양산우체국사서함, 226-4', '2021-09-17', '2021-09-24', '7', 'SFJ-03', 9, 'POU', '-', '-', 'ask-df310.txt', 10000000, 1000000, 10, 1000000, 500000, 8500000, 10500000, 5000, 8495000, 118, 95000, 17, 8400000, 'Active', '');

-- --------------------------------------------------------

--
-- Table structure for table `headerreimburse`
--

CREATE TABLE `headerreimburse` (
  `id` int(11) NOT NULL,
  `nama_pegawai` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `yang_mengetahui` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `yang_menyetujui` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerreimburse`
--

INSERT INTO `headerreimburse` (`id`, `nama_pegawai`, `yang_mengetahui`, `yang_menyetujui`, `status`) VALUES
(3, 'Lalisa manoban', 'Jisooo', 'Jennie kim', 'Process'),
(4, 'Mike', 'Sarah', 'Roeddy', 'Process'),
(5, 'Asep', 'Irva', 'Roeddy', 'Process');

-- --------------------------------------------------------

--
-- Table structure for table `headersaldoawal`
--

CREATE TABLE `headersaldoawal` (
  `id` int(11) NOT NULL,
  `tgl_konversi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headersaldoawal`
--

INSERT INTO `headersaldoawal` (`id`, `tgl_konversi`) VALUES
(9, '2021-09-09');

-- --------------------------------------------------------

--
-- Table structure for table `headerterimauang`
--

CREATE TABLE `headerterimauang` (
  `id` int(11) NOT NULL,
  `akun_setor_id` int(11) NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_attachment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` int(11) NOT NULL,
  `pajak` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headerterimauang`
--

INSERT INTO `headerterimauang` (`id`, `akun_setor_id`, `no_transaksi`, `tgl_transaksi`, `tag`, `memo`, `file_attachment`, `subtotal`, `pajak`, `total`, `status`, `kontak_id`) VALUES
(2, 5, 1, '2021-09-09', 'KOR', 'dsfffs', 'req.file.filename', 545000, 27250, 572250, 'Belum terekonsiliasi', 3),
(3, 10, 3, '2021-09-04', 'KOR', 'f', 'req.file.filename', 45000, 2250, 47250, 'Sudah Terekonsilisasi', 6);

-- --------------------------------------------------------

--
-- Table structure for table `jurnalaset`
--

CREATE TABLE `jurnalaset` (
  `id` int(11) NOT NULL,
  `header_aset_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jurnalbiaya`
--

CREATE TABLE `jurnalbiaya` (
  `id` int(11) NOT NULL,
  `header_biaya_id` int(11) NOT NULL,
  `akun_biaya_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalbiaya`
--

INSERT INTO `jurnalbiaya` (`id`, `header_biaya_id`, `akun_biaya_id`, `nominal`, `tipe_saldo`) VALUES
(33, 5, 154, 90000, 'Debit'),
(34, 5, 150, 500000, 'Debit'),
(35, 5, 62, 9000, 'Debit'),
(36, 5, 41, 15000, 'Debit'),
(37, 5, 116, 54400, 'Kredit'),
(38, 5, 6, 559600, 'Kredit'),
(39, 6, 102, 55000, 'Debit'),
(40, 6, 153, 9000, 'Debit'),
(41, 6, 180, 76000, 'Debit'),
(42, 6, 62, 5500, 'Debit'),
(43, 6, 58, 450, 'Debit'),
(44, 6, 95, 9120, 'Debit'),
(45, 6, 116, 5070, 'Kredit'),
(46, 6, 8, 150000, 'Kredit'),
(47, 7, 101, 96030, 'Debit'),
(48, 7, 154, 801000, 'Debit'),
(49, 7, 153, 14550, 'Debit'),
(50, 7, 41, 2970, 'Debit'),
(51, 7, 62, 89000, 'Debit'),
(52, 7, 41, 450, 'Debit'),
(53, 7, 116, 0, 'Kredit'),
(54, 7, 91, 1004000, 'Kredit'),
(55, 8, 102, 1400000, 'Debit'),
(56, 8, 153, 80000, 'Debit'),
(57, 8, 41, 42000, 'Debit'),
(58, 8, 58, 4000, 'Debit'),
(59, 8, 116, 5000, 'Kredit'),
(60, 8, 7, 1521000, 'Kredit'),
(61, 9, 107, 135800, 'Debit'),
(62, 9, 41, 4200, 'Debit'),
(63, 9, 116, 0, 'Kredit'),
(64, 9, 91, 140000, 'Kredit'),
(65, 10, 106, 499743, 'Debit'),
(66, 10, 95, 68146, 'Debit'),
(67, 10, 116, 5000, 'Kredit'),
(68, 10, 91, 562890, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnalinvoicepelepasanaset`
--

CREATE TABLE `jurnalinvoicepelepasanaset` (
  `id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pelepasan_aset_id` int(11) NOT NULL,
  `header_aset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jurnalkirimuang`
--

CREATE TABLE `jurnalkirimuang` (
  `id` int(11) NOT NULL,
  `header_kirim_uang_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalkirimuang`
--

INSERT INTO `jurnalkirimuang` (`id`, `header_kirim_uang_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(6, 2, 20, 45000, 'Debit'),
(7, 2, 86, 789000, 'Debit'),
(8, 2, 58, 2250, 'Debit'),
(9, 2, 95, 94680, 'Debit'),
(10, 2, 10, 930930, 'Kredit'),
(11, 3, 99, 100000, 'Debit'),
(12, 3, 62, 10000, 'Debit'),
(13, 3, 10, 110000, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpelepasanaset`
--

CREATE TABLE `jurnalpelepasanaset` (
  `id` int(11) NOT NULL,
  `header_pelepasan_aset_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header_aset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpembelian`
--

CREATE TABLE `jurnalpembelian` (
  `id` int(11) NOT NULL,
  `header_pembelian_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalpembelian`
--

INSERT INTO `jurnalpembelian` (`id`, `header_pembelian_id`, `akun_id`, `tipe_saldo`, `nominal`) VALUES
(1, 1, 45, 'Debit', 3200),
(2, 1, 58, 'Debit', 60000),
(3, 1, 12, 'Debit', 1240000),
(4, 1, 77, 'Kredit', 115200),
(5, 1, 119, 'Kredit', 188000),
(6, 1, 118, 'Kredit', 150000),
(7, 1, 124, 'Kredit', 850000),
(8, 2, 45, 'Debit', 11200),
(9, 2, 17, 'Debit', 140000),
(10, 2, 77, 'Kredit', 5000),
(11, 2, 119, 'Kredit', 28000),
(12, 2, 117, 'Kredit', 8200),
(13, 2, 124, 'Kredit', 110000),
(14, 3, 11, 'Debit', 0),
(15, 3, 14, 'Debit', 1400000),
(16, 3, 77, 'Kredit', 5000),
(17, 3, 119, 'Kredit', 280000),
(18, 3, 118, 'Kredit', 325000),
(19, 3, 124, 'Kredit', 790000);

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpenerimaanpembayaran`
--

CREATE TABLE `jurnalpenerimaanpembayaran` (
  `id` int(11) NOT NULL,
  `header_penjualan_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalpenerimaanpembayaran`
--

INSERT INTO `jurnalpenerimaanpembayaran` (`id`, `header_penjualan_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(33, 6, 4, 50000, 'Debit'),
(34, 6, 1, 50000, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpengirimanbayaran`
--

CREATE TABLE `jurnalpengirimanbayaran` (
  `id` int(11) NOT NULL,
  `header_pembelian_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalpengirimanbayaran`
--

INSERT INTO `jurnalpengirimanbayaran` (`id`, `header_pembelian_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(1, 2, 77, 18000, 'Debit'),
(2, 2, 6, 18000, 'Kredit'),
(3, 2, 77, 12000, 'Debit'),
(4, 2, 8, 12000, 'Kredit'),
(5, 1, 77, 850000, 'Debit'),
(6, 1, 8, 850000, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpengirimanbiaya`
--

CREATE TABLE `jurnalpengirimanbiaya` (
  `id` int(11) NOT NULL,
  `header_biaya_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalpengirimanbiaya`
--

INSERT INTO `jurnalpengirimanbiaya` (`id`, `header_biaya_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(3, 5, 6, 19600, 'Debit'),
(4, 5, 91, 19600, 'Kredit'),
(5, 6, 8, 25000, 'Debit'),
(6, 6, 91, 25000, 'Kredit'),
(7, 9, 14, 52000, 'Debit'),
(8, 9, 91, 52000, 'Kredit'),
(9, 8, 7, 1521000, 'Debit'),
(10, 8, 91, 1521000, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnalpenjualan`
--

CREATE TABLE `jurnalpenjualan` (
  `id` int(11) NOT NULL,
  `header_penjualan_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalpenjualan`
--

INSERT INTO `jurnalpenjualan` (`id`, `header_penjualan_id`, `akun_id`, `tipe_saldo`, `nominal`) VALUES
(38, 6, 17, 'Debit', 10550),
(39, 6, 26, 'Debit', 1500000),
(40, 6, 116, 'Debit', 369250),
(41, 6, 116, 'Debit', 5000),
(42, 6, 120, 'Kredit', 1855000),
(43, 6, 102, 'Kredit', 25600),
(44, 6, 108, 'Kredit', 0),
(45, 6, 105, 'Kredit', 4200),
(46, 7, 17, 'Debit', 500000),
(47, 7, 26, 'Debit', 4775000),
(48, 7, 116, 'Debit', 1200000),
(49, 7, 117, 'Debit', 5000),
(50, 7, 120, 'Kredit', 6000000),
(51, 7, 102, 'Kredit', 480000),
(52, 8, 17, 'Debit', 340000),
(53, 8, 26, 'Debit', 1459500),
(54, 8, 116, 'Debit', 300750),
(55, 8, 118, 'Debit', 5000),
(56, 8, 120, 'Kredit', 2005000),
(57, 8, 107, 'Kredit', 88000),
(58, 8, 107, 'Kredit', 12250),
(59, 9, 17, 'Debit', 95000),
(60, 9, 26, 'Debit', 8400000),
(61, 9, 116, 'Debit', 2000000),
(62, 9, 118, 'Debit', 5000),
(63, 9, 120, 'Kredit', 10000000),
(64, 9, 107, 'Kredit', 500000);

-- --------------------------------------------------------

--
-- Table structure for table `jurnalterimauang`
--

CREATE TABLE `jurnalterimauang` (
  `id` int(11) NOT NULL,
  `header_terima_uang_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnalterimauang`
--

INSERT INTO `jurnalterimauang` (`id`, `header_terima_uang_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(6, 2, 5, 572250, 'Debit'),
(7, 2, 23, 45000, 'Kredit'),
(8, 2, 35, 500000, 'Kredit'),
(9, 2, 107, 2250, 'Kredit'),
(10, 2, 107, 25000, 'Kredit'),
(11, 3, 10, 47250, 'Debit'),
(12, 3, 35, 45000, 'Kredit'),
(13, 3, 107, 2250, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `jurnaltransferuang`
--

CREATE TABLE `jurnaltransferuang` (
  `id` int(11) NOT NULL,
  `transfer_uang_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `nominal` int(11) NOT NULL,
  `tipe_saldo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jurnaltransferuang`
--

INSERT INTO `jurnaltransferuang` (`id`, `transfer_uang_id`, `akun_id`, `nominal`, `tipe_saldo`) VALUES
(5, 3, 5, 780550, 'Debit'),
(6, 3, 10, 780550, 'Kredit'),
(7, 4, 3, 890000, 'Debit'),
(8, 4, 1, 890000, 'Kredit');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `saldo_normal_id` int(11) NOT NULL,
  `saldo_normal_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `name`, `saldo_normal_id`, `saldo_normal_nama`) VALUES
(1, 'Akun Piutang', 1, 'Debit'),
(2, 'Aktiva Lancar Lainnya', 1, 'Debit'),
(3, 'Kas & Bank', 1, 'Debit'),
(4, 'Persediaan', 1, 'Debit'),
(5, 'Aktiva Tetap', 1, 'Debit'),
(6, 'Aktiva Lainnya', 1, 'Debit'),
(7, 'Depresiasi & Amortasi', 1, 'Debit'),
(8, 'Akun Hutang', 2, 'Kredit'),
(9, 'Kartu Kredit', 2, 'Kredit'),
(10, 'Kewajiban Lancar Lainnya', 2, 'Kredit'),
(11, 'Kewajiban Jangka Panjang', 2, 'Kredit'),
(12, 'Ekuitas', 2, 'Kredit'),
(13, 'Pendapatan', 2, 'Kredit'),
(14, 'Pendapatan Lainnya', 2, 'Kredit'),
(15, 'Harga Pokok Penjualan', 1, 'Debit'),
(16, 'Beban', 1, 'Debit'),
(17, 'Beban Lainnya', 1, 'Debit');

-- --------------------------------------------------------

--
-- Table structure for table `kategorikontak`
--

CREATE TABLE `kategorikontak` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategorikontak`
--

INSERT INTO `kategorikontak` (`id`, `nama`) VALUES
(1, 'Supplier'),
(2, 'Pelanggan'),
(3, 'Karyawan'),
(4, 'Lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `kategoriproduk`
--

CREATE TABLE `kategoriproduk` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategoriproduk`
--

INSERT INTO `kategoriproduk` (`id`, `nama`, `jumlah`) VALUES
(1, 'Makanan Ringan', 2),
(2, 'Makanan Berat', 1),
(3, 'Minuman', 3),
(4, 'Peralatan Kantor', 2),
(5, 'Electronic', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kontak`
--

CREATE TABLE `kontak` (
  `id` int(11) NOT NULL,
  `nama_panggilan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gelar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_hp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipe_identitas` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_identitas` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info_lain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_perusahaan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_telepon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_fax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_npwp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_pengiriman` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kantor_cabang_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pemegang_akun_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_rekening` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `akun_piutang` int(11) NOT NULL,
  `akun_hutang` int(11) NOT NULL,
  `syarat_pembayaran_utama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kontak`
--

INSERT INTO `kontak` (`id`, `nama_panggilan`, `gelar`, `nama`, `nomor_hp`, `tipe_identitas`, `nomor_identitas`, `email`, `info_lain`, `nama_perusahaan`, `nomor_telepon`, `nomor_fax`, `nomor_npwp`, `alamat_pembayaran`, `alamat_pengiriman`, `nama_bank`, `kantor_cabang_bank`, `pemegang_akun_bank`, `nomor_rekening`, `akun_piutang`, `akun_hutang`, `syarat_pembayaran_utama`) VALUES
(1, 'Jennie', 'Mrs.', 'Jennie Kim', '+82-2-081-4719', 'Passport', 'RC6419362', 'jenniekim@gmail.com', 'Technical Occupations', 'PT. Asus Indonesia', '99862191', ' 05488851', '600632998834065', '1312, 경남, 양산시, 양산우체국사서함, 226-4', '258-4, Yangsanucheguksaseoham, Yangsan-si, Gyeongsangnam-do', 'Busan Bank', 'Busan Bank', 'Jennie Kim', '350-32-424578-6', 20, 74, '1'),
(2, 'Rose', 'Mrs.', 'Roseanne Park', '+82-4-042-8520', 'Passport', 'MW1532005', 'roseannepark@gmail.com', 'Full-Time Worker', 'Unilever Indonesia', '45167229 ', '51789656', '388583700058637', '172-1, Gamjeon-dong, Sasang-gu, Busan', '1214, 부산, 사상구, 감전동, 131-1', 'Citibank Korea', 'Citibank Korea', 'Roseanne Park ', '866-94068-756-67', 21, 75, '4'),
(3, 'Jiso', 'Ms.', 'Kim Ji-soo', '+82-3-382-1982', 'Passport', 'TG3426996', 'kimjisoo@gmail.com', 'Studies', 'PT. Indodex', '75659510', '39258545', '587277894767991', '1229, 강원, 강릉시, 사천면, 사천진리, 228-4', '258-4, Hapyeongri, Sacheon-myeon, Gangreung-si, Gangwon-do', 'KB Kookmin Bank', 'KB Kookmin Bank', 'Roseanne Park ', '408252-95-942390', 22, 76, '2'),
(4, 'Lisa', 'Mrs.', 'Lalisa Manoban', '+82-2-577-5648', 'Passport', 'LV4775418', 'lalisamanoban@gmail.com', 'Architecture and Engineering Occupations', 'PT. Freeport', '44661320', '28708734', '007030872736037', '1159, 경남, 양산시, 중부동, 140-11', '177-11, Jungbu-dong, Yangsan-si, Gyeongsangnam-do', 'Korea Exchange Bank', 'Korea Exchange Bank', 'Lalisa Manoban', '566-74-06879-5', 23, 77, '3'),
(5, 'Mike', 'Mr.', 'Michael Kevin Montolalu', '+62-812-4596-5369', 'KTP', '283252021124561', 'mike@gmail.com', 'Internship', 'PT. Hexaon Business Mitrasindo', '46058137', '8388595', '-', '1309, 서울, 노원구, 하계2동, 극동아파트, 3-3', '46-46, Geonyeongapateu, Hagye 2(i)-dong, Nowon-gu, Seoul', 'Bank Central Asia (BCA)', 'BCA Binus Alam Sutera', 'Michael Kevin Montolalu', '701961560', 27, 79, '3'),
(6, 'Qyan', 'Mr.', 'Kevin Qyan Tanaka', '+62-712-5164-7800', 'SIM', 'SIM7615761', 'kevinqyan@gmail.com', 'Karyawan Life Tech', 'PT. Hexaon Business Mitrasindo', '764197626', '08361369', '-', '164-5, Gyeongdong 2(i)-ga, Mokpo-si, Jeollanam-do', '218, 전남, 목포시, 경동2가, 150-5', 'Daegu Bank', 'Daegu Bank', 'Kevin Qyan Tanaka', '431-66-500441-9', 24, 82, '4'),
(7, 'Kape', 'Ms.', 'Kevin Prawira', '+62-12-6436-6470', 'BPJS', 'BPJS5156100726', 'kevinprawira69@gmail.com', '-', 'PT. Tokopedia', '56245642', '79427382', '562465359070792407932', '264-4, Banyongri, Chukdong-myeon, Sacheon-si, Gyeongsangnam-do', '1185, 경남, 사천시, 축동면, 가산리, 214-4', 'Woori Bank', 'Woori Bank', 'Kevin Prawira', '4522-687-025448', 26, 81, '4'),
(8, 'Didi', 'Mr.', 'Didi Supriadi', '+62-615-6155-1341', 'KTP', '72156661231415', 'didisupriadi@gmail.com', 'Ketua Pelayaran Maersk, Inc.', 'Maersk', '929338', '730709', '425640840210674', '115-11, Uchiri, Samseo-myeon, Jangseong-gun, Jeollanam-do', '2185, 경남, 사천시, 축동면, 가산리, 214-4', 'Hana Bank', 'Hana Bank', 'Didi Supriadi', '950-412071-14577', 26, 93, '3');

-- --------------------------------------------------------

--
-- Table structure for table `kontakdetail`
--

CREATE TABLE `kontakdetail` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `kontak_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kontakdetail`
--

INSERT INTO `kontakdetail` (`id`, `kontak_id`, `kontak_type_id`) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 2, 4),
(4, 3, 2),
(5, 3, 3),
(6, 4, 3),
(7, 5, 1),
(8, 5, 3),
(9, 6, 2),
(10, 6, 1),
(11, 6, 3),
(12, 7, 4),
(13, 7, 1),
(14, 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `menu_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `menu_name`) VALUES
(1, 'Dashboard'),
(2, 'Jurnal'),
(3, 'User'),
(4, 'Role'),
(5, 'Daftar Akun'),
(6, 'Kontak'),
(7, 'Laporan'),
(8, 'Pajak'),
(9, 'Produk'),
(10, 'Kas & Bank'),
(11, 'Penjualan'),
(12, 'Pembelian'),
(13, 'Biaya'),
(14, 'Pengaturan'),
(15, 'Reimbursement'),
(16, 'Aset');

-- --------------------------------------------------------

--
-- Table structure for table `pajak`
--

CREATE TABLE `pajak` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `presentasaAktif` int(11) NOT NULL,
  `akunPenjual` int(11) NOT NULL,
  `akunPembeli` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pajak`
--

INSERT INTO `pajak` (`id`, `nama`, `presentasaAktif`, `akunPenjual`, `akunPembeli`) VALUES
(1, 'Pajak Jual Makanan (PJM)', 10, 98, 62),
(2, 'Pajak Minuman (PM)', 5, 107, 58),
(3, 'Pajak Bank Mandiri', 8, 102, 45),
(4, 'Pajak Pemakaian Jasa (PPJ)', 12, 105, 95),
(5, 'Pajak Kenderaan Motor (PKM)', 3, 133, 41);

-- --------------------------------------------------------

--
-- Table structure for table `pelepasanaset`
--

CREATE TABLE `pelepasanaset` (
  `id` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga_jual` int(11) NOT NULL,
  `deposit_id` int(11) NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header_aset_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerimaanpembayaran`
--

CREATE TABLE `penerimaanpembayaran` (
  `id` int(11) NOT NULL,
  `header_penjualan_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `cara_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_jauth_tempo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penerimaanpembayaran`
--

INSERT INTO `penerimaanpembayaran` (`id`, `header_penjualan_id`, `akun_id`, `cara_pembayaran`, `tgl_pembayaran`, `tgl_jauth_tempo`, `jumlah`) VALUES
(17, 6, 4, 'Cek dan Giro', '2021-09-02', '2021-09-20', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `pengirimanbayaran`
--

CREATE TABLE `pengirimanbayaran` (
  `id` int(11) NOT NULL,
  `header_pembelian_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `cara_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_jauth_tempo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengirimanbayaran`
--

INSERT INTO `pengirimanbayaran` (`id`, `header_pembelian_id`, `akun_id`, `cara_pembayaran`, `tgl_pembayaran`, `tgl_jauth_tempo`, `jumlah`) VALUES
(1, 2, 6, 'Kartu Kredit', '2021-09-11', '2021-09-02', 18000),
(2, 2, 8, 'Cek dan Giro', '2021-09-17', '2021-09-09', 12000),
(3, 1, 8, 'Cek dan Giro', '2021-09-16', '2021-09-15', 850000);

-- --------------------------------------------------------

--
-- Table structure for table `pengirimanbiaya`
--

CREATE TABLE `pengirimanbiaya` (
  `id` int(11) NOT NULL,
  `header_biaya_id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `cara_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_jauth_tempo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengirimanbiaya`
--

INSERT INTO `pengirimanbiaya` (`id`, `header_biaya_id`, `akun_id`, `cara_pembayaran`, `tgl_pembayaran`, `tgl_jauth_tempo`, `jumlah`) VALUES
(2, 5, 6, '30', '2021-09-16', '2021-09-10', 19600),
(3, 6, 8, '15 Hari', '2021-09-17', '2021-09-14', 25000),
(4, 9, 14, '15 Hari', '2021-09-10', '2021-09-17', 52000),
(5, 8, 7, '60 Hari', '2021-09-11', '2021-09-17', 1521000);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_sku` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori_produk_id` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `harga_beli_satuan` int(11) NOT NULL,
  `akun_pembelian` int(11) NOT NULL,
  `harga_jual_satuan` int(11) NOT NULL,
  `akun_penjualan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama`, `image`, `kode_sku`, `kategori_produk_id`, `unit`, `deskripsi`, `quantity`, `harga_beli_satuan`, `akun_pembelian`, `harga_jual_satuan`, `akun_penjualan`) VALUES
(1, 'Cheetos Cheese Ball Keju', '111-4bb2.PNG', 'C-5102', 1, 2, '1 box isi 1 lusin', 14, 80000, 123, 0, 1),
(2, 'Lays rasa Salmon Teriyaki', '111-8444.PNG', 'Lays-0591', 1, 2, '1 box isi 2 lusin', 39, 150000, 123, 320000, 118),
(3, 'Frozen Beef Wagyu A5', '111-14ee.PNG', 'WAG-JAP-1051', 2, 1, '1 pcs berat sekitar 500gr', 20, 1200000, 123, 2000000, 118),
(4, 'Aqua Galon 20L', '111-a11d.PNG', 'AQUA-2150', 3, 4, '-', 20, 0, 1, 35000, 118),
(5, 'Monitor LG 24inch', '111-9161.PNG', 'M-LG-196', 4, 6, '', 20, 0, 1, 1500000, 118),
(6, 'Mouse Logitech G102', '111-a68b.PNG', 'M-LOG-1577', 4, 6, '-', 5, 140000, 122, 0, 1),
(7, 'Fruity Blackcurrant', '111-e910c.PNG', 'FRUITY-BL-10001', 3, 2, '1 box isi 20 pcs', 26, 0, 1, 110000, 1),
(8, 'Kopi Luwak', '111-dfa1.PNG', 'KOPI-LU-145', 3, 2, '1 box isi 50 sachet', 14, 40000, 123, 95000, 118),
(9, 'Remot AC', '111-8097.PNG', 'REMOT-AC-11', 5, 2, '-', 4, 50000, 64, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `roleType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleDesc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleType`, `roleDesc`) VALUES
(1, 'Admin', 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `roleprivellege`
--

CREATE TABLE `roleprivellege` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `value` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roleprivellege`
--

INSERT INTO `roleprivellege` (`id`, `role_id`, `menu_id`, `value`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 1),
(6, 1, 6, 1),
(7, 1, 7, 1),
(8, 1, 8, 1),
(9, 1, 9, 1),
(10, 1, 10, 1),
(11, 1, 11, 1),
(12, 1, 12, 1),
(13, 1, 13, 1),
(14, 1, 14, 1),
(15, 1, 15, 1),
(16, 1, 16, 1);

-- --------------------------------------------------------

--
-- Table structure for table `satuanproduk`
--

CREATE TABLE `satuanproduk` (
  `id` int(11) NOT NULL,
  `satuan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `satuanproduk`
--

INSERT INTO `satuanproduk` (`id`, `satuan`) VALUES
(1, 'pcs'),
(2, 'box'),
(3, 'lusin'),
(4, 'buah'),
(5, 'lembar'),
(6, 'biji');

-- --------------------------------------------------------

--
-- Table structure for table `settingdefault`
--

CREATE TABLE `settingdefault` (
  `id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `tipe` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_setting` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settingdefault`
--

INSERT INTO `settingdefault` (`id`, `akun_id`, `tipe`, `nama_setting`) VALUES
(1, 120, 'penjualan', 'pendapatan_penjualan'),
(2, 116, 'penjualan', 'diskon_penjualan'),
(3, 116, 'penjualan', 'pemotongan'),
(4, 1, 'penjualan', 'pembayaran_dimuka'),
(5, 26, 'penjualan', 'piutang_blm_ditagih'),
(6, 108, 'penjualan', 'pajak_penjualan'),
(7, 124, 'pembelian', 'pembelian_cogs'),
(8, 116, 'pembelian', 'pemotongan'),
(9, 1, 'pembelian', 'uang_muka_pembelian'),
(10, 77, 'pembelian', 'hutang_blm_ditagih'),
(11, 99, 'pembelian', 'pajak_pembelian'),
(12, 119, 'pembelian', 'diskon_pembelian'),
(13, 116, 'biaya', 'pemotongan'),
(14, 91, 'biaya', 'hutang_usaha'),
(15, 111, 'aset', 'ekuitas_saldo_awal'),
(16, 64, 'aset', 'aset_tetap');

-- --------------------------------------------------------

--
-- Table structure for table `settingperusahaan`
--

CREATE TABLE `settingperusahaan` (
  `id` int(11) NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tampilkan_logo` tinyint(1) NOT NULL,
  `nama_perushaan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_pengiriman` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fax` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `npwp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cabang_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat_bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_rekening` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `atas_nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `swift_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settingperusahaan`
--

INSERT INTO `settingperusahaan` (`id`, `logo`, `tampilkan_logo`, `nama_perushaan`, `alamat`, `alamat_pengiriman`, `telepon`, `fax`, `npwp`, `website`, `email`, `nama_bank`, `cabang_bank`, `alamat_bank`, `nomor_rekening`, `atas_nama`, `swift_code`) VALUES
(1, 'req.file.filename', 0, '-', 'Arthaloka Building, Jl. Jend. Sudirman No.10, RT.10/RW.11, Karet Tengsin, Tanah Abang, Central Jakarta City,', 'Arthaloka Building, Jl. Jend. Sudirman No.10, RT.10/RW.11, Karet Tengsin, Tanah Abang, Central Jakarta City,', '-', '-', '-', 'http://hbm.co.id/', '	admin@hbm.co.id', 'Bank Central Asia', 'Bank Central Asia', 'Menara BCA, lantai 25, Jl., MH Thamrin no. 1', '-', 'PT. Hexaon Business Mitrasindo', 'CENAIDJA');

-- --------------------------------------------------------

--
-- Table structure for table `syaratpembayaran`
--

CREATE TABLE `syaratpembayaran` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `nama_pembayaran` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `syaratpembayaran`
--

INSERT INTO `syaratpembayaran` (`id`, `value`, `nama_pembayaran`) VALUES
(1, 0, 'Tunai/Cash'),
(2, 0, 'Kredit/Term of Payment'),
(3, 7, '1 Minggu'),
(4, 10, '10 Hari'),
(5, 15, '15 Hari'),
(6, 30, '30 Hari'),
(7, 60, '60 Hari');

-- --------------------------------------------------------

--
-- Table structure for table `tipeakun`
--

CREATE TABLE `tipeakun` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tipeakun`
--

INSERT INTO `tipeakun` (`id`, `name`) VALUES
(1, 'Kas'),
(2, 'Bank'),
(3, 'Ayat Silang'),
(4, 'Piutang Usaha'),
(5, 'Piutang Karyawan & Lain-Lain'),
(6, 'Piutang Direksi'),
(7, 'Pembayaran Muka'),
(8, 'Uang Muka Pajak'),
(9, 'Biaya Dibayar Dimuka Lain-Lain'),
(10, 'Aktiva Tetap'),
(11, 'Akumulasi Penyusutan Aktiva'),
(12, 'Utang Dagang'),
(13, 'Utang Pajak'),
(14, 'Utang Lain-Lain'),
(15, 'Utang Pemegang Saham'),
(16, 'Modal Saham'),
(17, 'Laba Ditahan'),
(18, 'Penjualan'),
(19, 'Beban HPP'),
(20, 'Beban Penjualan'),
(21, 'Beban Administrasi dan Umum'),
(22, 'Pendapatan Lain-Lain'),
(23, 'Beban Lain-Lain');

-- --------------------------------------------------------

--
-- Table structure for table `transferuang`
--

CREATE TABLE `transferuang` (
  `id` int(11) NOT NULL,
  `akun_transfer_id` int(11) NOT NULL,
  `akun_setor_id` int(11) NOT NULL,
  `memo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `tgl_transaksi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transferuang`
--

INSERT INTO `transferuang` (`id`, `akun_transfer_id`, `akun_setor_id`, `memo`, `no_transaksi`, `tgl_transaksi`, `tag`, `status`, `total`) VALUES
(3, 10, 5, '-', 3, '2021-09-10', 'KOR', 'Sudah Terekonsilisasi', 780550),
(4, 1, 3, '-', 4, '2021-09-24', 'KOR', 'Sudah Terekonsilisasi', 890000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int(11) NOT NULL,
  `loggedIn` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `roleId`, `loggedIn`) VALUES
(1, 'Admin', 'HBM', 'admin@hbm.co.id', 'admin1234', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('138c3765-41a3-46dd-934f-1ba5cef58310', '9557b76538eae72cc83598a1526732749f7b41e0c2708b6c256c5a9c65c69e9', '2021-09-09 03:52:45.114', '20210909035244_hbm12', NULL, NULL, '2021-09-09 03:52:44.354', 1),
('140fee2c-0f38-4140-8934-e1f7fefb661d', '10ab8da77173f845cd1a43ea375ae9b69ac2eefbbf2904516bbc6e175ea14a6', '2021-09-03 10:13:06.774', '20210903101302_hbm2', NULL, NULL, '2021-09-03 10:13:03.053', 1),
('246de60d-7807-4243-b281-db66311202d1', 'fcb2754c2fb81089b68bb34dcf5bc3e9ae8f185ab05b75fc6e773d56c96bbcd', '2021-09-09 00:53:12.183', '20210909005307_hbm10', NULL, NULL, '2021-09-09 00:53:08.102', 1),
('2530a89f-0d86-4c68-932c-db11afe72c53', 'a3b27ebef6b40e6982e97e71596f0e6f88f6b8dddafddb1d4cea4e58c8437b4', '2021-09-09 09:20:20.320', '20210909092019_hbm14', NULL, NULL, '2021-09-09 09:20:19.481', 1),
('299fc57f-c75d-4567-a1c8-5b039bb58791', '1834e4537281d9b3ddfd36f99b846e95951a501950e464f342451ca6661c32', '2021-09-03 16:44:51.959', '20210903164445_hbm3', NULL, NULL, '2021-09-03 16:44:45.648', 1),
('3a634042-381c-46d1-a602-78218e91b57d', 'cd8d2b96a4b1750fa956dff39c96ce82e45781adc7e7e4eca53732f5e6420', '2021-09-09 06:14:28.264', '20210909061420_hbm13', NULL, NULL, '2021-09-09 06:14:20.259', 1),
('3ac99e6e-e2f4-4c84-b9db-5b239bf439f6', '26f14b5e53f1aa71a1f8b617e6297b6f3b1ca3415beb916e8f79cb1cc011b94e', '2021-09-05 19:12:47.649', '20210905191246_hbm6', NULL, NULL, '2021-09-05 19:12:46.881', 1),
('3b6ddde4-3235-498d-913b-3602fb95d95d', '2083f8a0a5add2453e78d6949a331839e09e0185ea16e809ce34a9abfd7521b', '2021-09-05 18:18:23.137', '20210905181821_hbm4', NULL, NULL, '2021-09-05 18:18:22.151', 1),
('76247349-e344-4711-a8af-41d14d60e5b2', 'be15df4b927645e33c7275d2e78d77e8a75c98f293ad25b6d44bbbc6b75c4c', '2021-09-09 01:54:28.607', '20210909015425_hbm11', NULL, NULL, '2021-09-09 01:54:26.171', 1),
('885ec8f7-996d-4174-8fc6-58165395b467', '14c3d8a08f6628259767656d34f2d2e174de25e1bf95a9edbe7233fe1f36ef4', '2021-09-23 17:01:21.100', '20210923170108_hbm15', NULL, NULL, '2021-09-23 17:01:08.250', 1),
('8e46fe2e-d5c0-4cc6-ad8e-06082a7be5e7', 'dbc4c2d4413887255f41d8b7c57de5926d5c1aefadefa946563f6eebaceef3d', '2021-09-03 07:01:50.668', '20210903065824_hbm1', NULL, NULL, '2021-09-03 06:58:24.882', 1),
('b2662546-6aff-4055-ac21-b7a48c66c781', '85241715d33a6e47a5f6bc884747e75fd9c4d9edd52e1d6781ff23e41268b48', '2021-09-07 10:14:48.351', '20210907101445_hbm8', NULL, NULL, '2021-09-07 10:14:45.992', 1),
('c96157d7-0728-45b6-82f9-1750ae4c1821', '90b67fc18cb317b38d40d94e57166c6f66382a2140992228e129febdc50f2', '2021-09-07 13:27:28.369', '20210907132725_hbm9', NULL, NULL, '2021-09-07 13:27:26.500', 1),
('edf2b740-98c3-4b0f-a3a1-24df450a6092', '208b72dc7625a9975df6adbd6b2bc65d4df7b7bf7fa241dffba6cdcf37085', '2021-09-07 08:53:12.711', '20210907085309_hbm7', NULL, NULL, '2021-09-07 08:53:10.005', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipeId` (`tipeId`),
  ADD KEY `kategoriId` (`kategoriId`);

--
-- Indexes for table `aset`
--
ALTER TABLE `aset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_aset_id` (`akun_aset_id`),
  ADD KEY `akun_dikreditkan_id` (`akun_dikreditkan_id`),
  ADD KEY `akun_penyusutan_id` (`akun_penyusutan_id`),
  ADD KEY `akumulasi_akun_penyusutan_id` (`akumulasi_akun_penyusutan_id`);

--
-- Indexes for table `detailbiaya`
--
ALTER TABLE `detailbiaya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_biaya_id` (`header_biaya_id`),
  ADD KEY `akun_biaya_id` (`akun_biaya_id`),
  ADD KEY `pajak_id` (`pajak_id`),
  ADD KEY `pajak_akun_beli_id` (`pajak_akun_beli_id`);

--
-- Indexes for table `detailjurnal`
--
ALTER TABLE `detailjurnal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_jurnal_id` (`header_jurnal_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `detailkirimuang`
--
ALTER TABLE `detailkirimuang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_kirim_uang_id` (`header_kirim_uang_id`),
  ADD KEY `akun_id` (`akun_id`),
  ADD KEY `pajak_id` (`pajak_id`),
  ADD KEY `pajak_beli_id` (`pajak_beli_id`);

--
-- Indexes for table `detailpembelian`
--
ALTER TABLE `detailpembelian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_pembelian_id` (`header_pembelian_id`),
  ADD KEY `produk_id` (`produk_id`),
  ADD KEY `pajak_id` (`pajak_id`),
  ADD KEY `pajak_beli_id` (`pajak_beli_id`);

--
-- Indexes for table `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_penjualan_id` (`header_penjualan_id`),
  ADD KEY `produk_id` (`produk_id`),
  ADD KEY `pajak_id` (`pajak_id`),
  ADD KEY `pajak_jual_id` (`pajak_jual_id`);

--
-- Indexes for table `detailreimburse`
--
ALTER TABLE `detailreimburse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_reimburse_id` (`header_reimburse_id`);

--
-- Indexes for table `detailsaldoawal`
--
ALTER TABLE `detailsaldoawal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_saldo_awal_id` (`header_saldo_awal_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `detailterimauang`
--
ALTER TABLE `detailterimauang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_terima_uang_id` (`header_terima_uang_id`),
  ADD KEY `akun_id` (`akun_id`),
  ADD KEY `pajak_id` (`pajak_id`),
  ADD KEY `pajak_jual_id` (`pajak_jual_id`);

--
-- Indexes for table `headerbiaya`
--
ALTER TABLE `headerbiaya`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HeaderBiaya.no_transaksi_unique` (`no_transaksi`),
  ADD KEY `akun_kas_bank` (`akun_kas_bank`),
  ADD KEY `nama_penerima` (`nama_penerima`),
  ADD KEY `akun_pemotongan` (`akun_pemotongan`);

--
-- Indexes for table `headerjurnal`
--
ALTER TABLE `headerjurnal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headerkirimuang`
--
ALTER TABLE `headerkirimuang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_bayar_id` (`akun_bayar_id`),
  ADD KEY `kontak_id` (`kontak_id`);

--
-- Indexes for table `headerpembelian`
--
ALTER TABLE `headerpembelian`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HeaderPembelian.no_transaksi_unique` (`no_transaksi`),
  ADD KEY `kontak_id` (`kontak_id`),
  ADD KEY `akun_pemotongan` (`akun_pemotongan`),
  ADD KEY `akun_uang_muka` (`akun_uang_muka`);

--
-- Indexes for table `headerpenjualan`
--
ALTER TABLE `headerpenjualan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HeaderPenjualan.no_transaksi_unique` (`no_transaksi`),
  ADD KEY `kontak_id` (`kontak_id`),
  ADD KEY `akun_pemotongan` (`akun_pemotongan`),
  ADD KEY `akun_uang_muka` (`akun_uang_muka`);

--
-- Indexes for table `headerreimburse`
--
ALTER TABLE `headerreimburse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headersaldoawal`
--
ALTER TABLE `headersaldoawal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headerterimauang`
--
ALTER TABLE `headerterimauang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_setor_id` (`akun_setor_id`),
  ADD KEY `kontak_id` (`kontak_id`);

--
-- Indexes for table `jurnalaset`
--
ALTER TABLE `jurnalaset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_aset_id` (`header_aset_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalbiaya`
--
ALTER TABLE `jurnalbiaya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_biaya_id` (`header_biaya_id`),
  ADD KEY `akun_biaya_id` (`akun_biaya_id`);

--
-- Indexes for table `jurnalinvoicepelepasanaset`
--
ALTER TABLE `jurnalinvoicepelepasanaset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_id` (`akun_id`),
  ADD KEY `pelepasan_aset_id` (`pelepasan_aset_id`),
  ADD KEY `header_aset_id` (`header_aset_id`);

--
-- Indexes for table `jurnalkirimuang`
--
ALTER TABLE `jurnalkirimuang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_kirim_uang_id` (`header_kirim_uang_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalpelepasanaset`
--
ALTER TABLE `jurnalpelepasanaset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_pelepasan_aset_id` (`header_pelepasan_aset_id`),
  ADD KEY `akun_id` (`akun_id`),
  ADD KEY `header_aset_id` (`header_aset_id`);

--
-- Indexes for table `jurnalpembelian`
--
ALTER TABLE `jurnalpembelian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_pembelian_id` (`header_pembelian_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalpenerimaanpembayaran`
--
ALTER TABLE `jurnalpenerimaanpembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_penjualan_id` (`header_penjualan_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalpengirimanbayaran`
--
ALTER TABLE `jurnalpengirimanbayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_pembelian_id` (`header_pembelian_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalpengirimanbiaya`
--
ALTER TABLE `jurnalpengirimanbiaya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_biaya_id` (`header_biaya_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalpenjualan`
--
ALTER TABLE `jurnalpenjualan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_penjualan_id` (`header_penjualan_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnalterimauang`
--
ALTER TABLE `jurnalterimauang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_terima_uang_id` (`header_terima_uang_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `jurnaltransferuang`
--
ALTER TABLE `jurnaltransferuang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transfer_uang_id` (`transfer_uang_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategorikontak`
--
ALTER TABLE `kategorikontak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategoriproduk`
--
ALTER TABLE `kategoriproduk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_piutang` (`akun_piutang`),
  ADD KEY `akun_hutang` (`akun_hutang`);

--
-- Indexes for table `kontakdetail`
--
ALTER TABLE `kontakdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kontak_id` (`kontak_id`),
  ADD KEY `kontak_type_id` (`kontak_type_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pajak`
--
ALTER TABLE `pajak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akunPenjual` (`akunPenjual`),
  ADD KEY `akunPembeli` (`akunPembeli`);

--
-- Indexes for table `pelepasanaset`
--
ALTER TABLE `pelepasanaset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deposit_id` (`deposit_id`),
  ADD KEY `header_aset_id` (`header_aset_id`);

--
-- Indexes for table `penerimaanpembayaran`
--
ALTER TABLE `penerimaanpembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_penjualan_id` (`header_penjualan_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `pengirimanbayaran`
--
ALTER TABLE `pengirimanbayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_pembelian_id` (`header_pembelian_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `pengirimanbiaya`
--
ALTER TABLE `pengirimanbiaya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `header_biaya_id` (`header_biaya_id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_produk_id` (`kategori_produk_id`),
  ADD KEY `unit` (`unit`),
  ADD KEY `akun_pembelian` (`akun_pembelian`),
  ADD KEY `akun_penjualan` (`akun_penjualan`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roleprivellege`
--
ALTER TABLE `roleprivellege`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `satuanproduk`
--
ALTER TABLE `satuanproduk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settingdefault`
--
ALTER TABLE `settingdefault`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_id` (`akun_id`);

--
-- Indexes for table `settingperusahaan`
--
ALTER TABLE `settingperusahaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `syaratpembayaran`
--
ALTER TABLE `syaratpembayaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipeakun`
--
ALTER TABLE `tipeakun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transferuang`
--
ALTER TABLE `transferuang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_transfer_id` (`akun_transfer_id`),
  ADD KEY `akun_setor_id` (`akun_setor_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User.email_unique` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT for table `aset`
--
ALTER TABLE `aset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detailbiaya`
--
ALTER TABLE `detailbiaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `detailjurnal`
--
ALTER TABLE `detailjurnal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `detailkirimuang`
--
ALTER TABLE `detailkirimuang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detailpembelian`
--
ALTER TABLE `detailpembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `detailreimburse`
--
ALTER TABLE `detailreimburse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `detailsaldoawal`
--
ALTER TABLE `detailsaldoawal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2359;

--
-- AUTO_INCREMENT for table `detailterimauang`
--
ALTER TABLE `detailterimauang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `headerbiaya`
--
ALTER TABLE `headerbiaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `headerjurnal`
--
ALTER TABLE `headerjurnal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `headerkirimuang`
--
ALTER TABLE `headerkirimuang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `headerpembelian`
--
ALTER TABLE `headerpembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `headerpenjualan`
--
ALTER TABLE `headerpenjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `headerreimburse`
--
ALTER TABLE `headerreimburse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `headersaldoawal`
--
ALTER TABLE `headersaldoawal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `headerterimauang`
--
ALTER TABLE `headerterimauang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jurnalaset`
--
ALTER TABLE `jurnalaset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jurnalbiaya`
--
ALTER TABLE `jurnalbiaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `jurnalinvoicepelepasanaset`
--
ALTER TABLE `jurnalinvoicepelepasanaset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jurnalkirimuang`
--
ALTER TABLE `jurnalkirimuang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jurnalpelepasanaset`
--
ALTER TABLE `jurnalpelepasanaset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jurnalpembelian`
--
ALTER TABLE `jurnalpembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `jurnalpenerimaanpembayaran`
--
ALTER TABLE `jurnalpenerimaanpembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `jurnalpengirimanbayaran`
--
ALTER TABLE `jurnalpengirimanbayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jurnalpengirimanbiaya`
--
ALTER TABLE `jurnalpengirimanbiaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `jurnalpenjualan`
--
ALTER TABLE `jurnalpenjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `jurnalterimauang`
--
ALTER TABLE `jurnalterimauang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jurnaltransferuang`
--
ALTER TABLE `jurnaltransferuang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `kategorikontak`
--
ALTER TABLE `kategorikontak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kategoriproduk`
--
ALTER TABLE `kategoriproduk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kontakdetail`
--
ALTER TABLE `kontakdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pajak`
--
ALTER TABLE `pajak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pelepasanaset`
--
ALTER TABLE `pelepasanaset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penerimaanpembayaran`
--
ALTER TABLE `penerimaanpembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pengirimanbayaran`
--
ALTER TABLE `pengirimanbayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pengirimanbiaya`
--
ALTER TABLE `pengirimanbiaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roleprivellege`
--
ALTER TABLE `roleprivellege`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `satuanproduk`
--
ALTER TABLE `satuanproduk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settingdefault`
--
ALTER TABLE `settingdefault`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `settingperusahaan`
--
ALTER TABLE `settingperusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `syaratpembayaran`
--
ALTER TABLE `syaratpembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tipeakun`
--
ALTER TABLE `tipeakun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `transferuang`
--
ALTER TABLE `transferuang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akun`
--
ALTER TABLE `akun`
  ADD CONSTRAINT `akun_ibfk_1` FOREIGN KEY (`tipeId`) REFERENCES `tipeakun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `akun_ibfk_2` FOREIGN KEY (`kategoriId`) REFERENCES `kategori` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `aset`
--
ALTER TABLE `aset`
  ADD CONSTRAINT `aset_ibfk_1` FOREIGN KEY (`akun_aset_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aset_ibfk_2` FOREIGN KEY (`akun_dikreditkan_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aset_ibfk_3` FOREIGN KEY (`akun_penyusutan_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aset_ibfk_4` FOREIGN KEY (`akumulasi_akun_penyusutan_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailbiaya`
--
ALTER TABLE `detailbiaya`
  ADD CONSTRAINT `detailbiaya_ibfk_1` FOREIGN KEY (`header_biaya_id`) REFERENCES `headerbiaya` (`no_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailbiaya_ibfk_2` FOREIGN KEY (`akun_biaya_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailbiaya_ibfk_3` FOREIGN KEY (`pajak_id`) REFERENCES `pajak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailbiaya_ibfk_4` FOREIGN KEY (`pajak_akun_beli_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailjurnal`
--
ALTER TABLE `detailjurnal`
  ADD CONSTRAINT `detailjurnal_ibfk_1` FOREIGN KEY (`header_jurnal_id`) REFERENCES `headerjurnal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailjurnal_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailkirimuang`
--
ALTER TABLE `detailkirimuang`
  ADD CONSTRAINT `detailkirimuang_ibfk_1` FOREIGN KEY (`header_kirim_uang_id`) REFERENCES `headerkirimuang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkirimuang_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkirimuang_ibfk_3` FOREIGN KEY (`pajak_id`) REFERENCES `pajak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkirimuang_ibfk_4` FOREIGN KEY (`pajak_beli_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailpembelian`
--
ALTER TABLE `detailpembelian`
  ADD CONSTRAINT `detailpembelian_ibfk_1` FOREIGN KEY (`header_pembelian_id`) REFERENCES `headerpembelian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpembelian_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpembelian_ibfk_3` FOREIGN KEY (`pajak_id`) REFERENCES `pajak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpembelian_ibfk_4` FOREIGN KEY (`pajak_beli_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailpenjualan`
--
ALTER TABLE `detailpenjualan`
  ADD CONSTRAINT `detailpenjualan_ibfk_1` FOREIGN KEY (`header_penjualan_id`) REFERENCES `headerpenjualan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpenjualan_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpenjualan_ibfk_3` FOREIGN KEY (`pajak_id`) REFERENCES `pajak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailpenjualan_ibfk_4` FOREIGN KEY (`pajak_jual_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailreimburse`
--
ALTER TABLE `detailreimburse`
  ADD CONSTRAINT `detailreimburse_ibfk_1` FOREIGN KEY (`header_reimburse_id`) REFERENCES `headerreimburse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailsaldoawal`
--
ALTER TABLE `detailsaldoawal`
  ADD CONSTRAINT `detailsaldoawal_ibfk_1` FOREIGN KEY (`header_saldo_awal_id`) REFERENCES `headersaldoawal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailsaldoawal_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detailterimauang`
--
ALTER TABLE `detailterimauang`
  ADD CONSTRAINT `detailterimauang_ibfk_1` FOREIGN KEY (`header_terima_uang_id`) REFERENCES `headerterimauang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailterimauang_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailterimauang_ibfk_3` FOREIGN KEY (`pajak_id`) REFERENCES `pajak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailterimauang_ibfk_4` FOREIGN KEY (`pajak_jual_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headerbiaya`
--
ALTER TABLE `headerbiaya`
  ADD CONSTRAINT `headerbiaya_ibfk_1` FOREIGN KEY (`akun_kas_bank`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerbiaya_ibfk_2` FOREIGN KEY (`nama_penerima`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerbiaya_ibfk_3` FOREIGN KEY (`akun_pemotongan`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headerkirimuang`
--
ALTER TABLE `headerkirimuang`
  ADD CONSTRAINT `headerkirimuang_ibfk_1` FOREIGN KEY (`akun_bayar_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerkirimuang_ibfk_2` FOREIGN KEY (`kontak_id`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headerpembelian`
--
ALTER TABLE `headerpembelian`
  ADD CONSTRAINT `headerpembelian_ibfk_1` FOREIGN KEY (`kontak_id`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerpembelian_ibfk_2` FOREIGN KEY (`akun_pemotongan`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerpembelian_ibfk_3` FOREIGN KEY (`akun_uang_muka`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headerpenjualan`
--
ALTER TABLE `headerpenjualan`
  ADD CONSTRAINT `headerpenjualan_ibfk_1` FOREIGN KEY (`kontak_id`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerpenjualan_ibfk_2` FOREIGN KEY (`akun_pemotongan`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerpenjualan_ibfk_3` FOREIGN KEY (`akun_uang_muka`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headerterimauang`
--
ALTER TABLE `headerterimauang`
  ADD CONSTRAINT `headerterimauang_ibfk_1` FOREIGN KEY (`akun_setor_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `headerterimauang_ibfk_2` FOREIGN KEY (`kontak_id`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalaset`
--
ALTER TABLE `jurnalaset`
  ADD CONSTRAINT `jurnalaset_ibfk_1` FOREIGN KEY (`header_aset_id`) REFERENCES `aset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalaset_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalbiaya`
--
ALTER TABLE `jurnalbiaya`
  ADD CONSTRAINT `jurnalbiaya_ibfk_1` FOREIGN KEY (`header_biaya_id`) REFERENCES `headerbiaya` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalbiaya_ibfk_2` FOREIGN KEY (`akun_biaya_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalinvoicepelepasanaset`
--
ALTER TABLE `jurnalinvoicepelepasanaset`
  ADD CONSTRAINT `jurnalinvoicepelepasanaset_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalinvoicepelepasanaset_ibfk_3` FOREIGN KEY (`pelepasan_aset_id`) REFERENCES `pelepasanaset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalinvoicepelepasanaset_ibfk_4` FOREIGN KEY (`header_aset_id`) REFERENCES `aset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalkirimuang`
--
ALTER TABLE `jurnalkirimuang`
  ADD CONSTRAINT `jurnalkirimuang_ibfk_1` FOREIGN KEY (`header_kirim_uang_id`) REFERENCES `headerkirimuang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalkirimuang_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpelepasanaset`
--
ALTER TABLE `jurnalpelepasanaset`
  ADD CONSTRAINT `jurnalpelepasanaset_ibfk_1` FOREIGN KEY (`header_pelepasan_aset_id`) REFERENCES `pelepasanaset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpelepasanaset_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpelepasanaset_ibfk_3` FOREIGN KEY (`header_aset_id`) REFERENCES `aset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpembelian`
--
ALTER TABLE `jurnalpembelian`
  ADD CONSTRAINT `jurnalpembelian_ibfk_1` FOREIGN KEY (`header_pembelian_id`) REFERENCES `headerpembelian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpembelian_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpenerimaanpembayaran`
--
ALTER TABLE `jurnalpenerimaanpembayaran`
  ADD CONSTRAINT `jurnalpenerimaanpembayaran_ibfk_1` FOREIGN KEY (`header_penjualan_id`) REFERENCES `headerpenjualan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpenerimaanpembayaran_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpengirimanbayaran`
--
ALTER TABLE `jurnalpengirimanbayaran`
  ADD CONSTRAINT `jurnalpengirimanbayaran_ibfk_1` FOREIGN KEY (`header_pembelian_id`) REFERENCES `headerpembelian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpengirimanbayaran_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpengirimanbiaya`
--
ALTER TABLE `jurnalpengirimanbiaya`
  ADD CONSTRAINT `jurnalpengirimanbiaya_ibfk_1` FOREIGN KEY (`header_biaya_id`) REFERENCES `headerbiaya` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpengirimanbiaya_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalpenjualan`
--
ALTER TABLE `jurnalpenjualan`
  ADD CONSTRAINT `jurnalpenjualan_ibfk_1` FOREIGN KEY (`header_penjualan_id`) REFERENCES `headerpenjualan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalpenjualan_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnalterimauang`
--
ALTER TABLE `jurnalterimauang`
  ADD CONSTRAINT `jurnalterimauang_ibfk_1` FOREIGN KEY (`header_terima_uang_id`) REFERENCES `headerterimauang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnalterimauang_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jurnaltransferuang`
--
ALTER TABLE `jurnaltransferuang`
  ADD CONSTRAINT `jurnaltransferuang_ibfk_1` FOREIGN KEY (`transfer_uang_id`) REFERENCES `transferuang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jurnaltransferuang_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kontak`
--
ALTER TABLE `kontak`
  ADD CONSTRAINT `kontak_ibfk_1` FOREIGN KEY (`akun_piutang`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kontak_ibfk_2` FOREIGN KEY (`akun_hutang`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kontakdetail`
--
ALTER TABLE `kontakdetail`
  ADD CONSTRAINT `kontakdetail_ibfk_1` FOREIGN KEY (`kontak_id`) REFERENCES `kontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kontakdetail_ibfk_2` FOREIGN KEY (`kontak_type_id`) REFERENCES `kategorikontak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pajak`
--
ALTER TABLE `pajak`
  ADD CONSTRAINT `pajak_ibfk_1` FOREIGN KEY (`akunPenjual`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pajak_ibfk_2` FOREIGN KEY (`akunPembeli`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pelepasanaset`
--
ALTER TABLE `pelepasanaset`
  ADD CONSTRAINT `pelepasanaset_ibfk_1` FOREIGN KEY (`deposit_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pelepasanaset_ibfk_2` FOREIGN KEY (`header_aset_id`) REFERENCES `aset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penerimaanpembayaran`
--
ALTER TABLE `penerimaanpembayaran`
  ADD CONSTRAINT `penerimaanpembayaran_ibfk_1` FOREIGN KEY (`header_penjualan_id`) REFERENCES `headerpenjualan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penerimaanpembayaran_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengirimanbayaran`
--
ALTER TABLE `pengirimanbayaran`
  ADD CONSTRAINT `pengirimanbayaran_ibfk_1` FOREIGN KEY (`header_pembelian_id`) REFERENCES `headerpembelian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengirimanbayaran_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengirimanbiaya`
--
ALTER TABLE `pengirimanbiaya`
  ADD CONSTRAINT `pengirimanbiaya_ibfk_1` FOREIGN KEY (`header_biaya_id`) REFERENCES `headerbiaya` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengirimanbiaya_ibfk_2` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`kategori_produk_id`) REFERENCES `kategoriproduk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produk_ibfk_2` FOREIGN KEY (`unit`) REFERENCES `satuanproduk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produk_ibfk_3` FOREIGN KEY (`akun_pembelian`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produk_ibfk_4` FOREIGN KEY (`akun_penjualan`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roleprivellege`
--
ALTER TABLE `roleprivellege`
  ADD CONSTRAINT `roleprivellege_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roleprivellege_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `settingdefault`
--
ALTER TABLE `settingdefault`
  ADD CONSTRAINT `settingdefault_ibfk_1` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transferuang`
--
ALTER TABLE `transferuang`
  ADD CONSTRAINT `transferuang_ibfk_1` FOREIGN KEY (`akun_transfer_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transferuang_ibfk_2` FOREIGN KEY (`akun_setor_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
