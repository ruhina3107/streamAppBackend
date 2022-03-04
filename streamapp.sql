-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2022 at 05:40 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `streamapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(255) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userMail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userMobile` varchar(255) DEFAULT NULL,
  `isAdmin` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `userName`, `userMail`, `password`, `userMobile`, `isAdmin`, `createdAt`) VALUES
(1, 'ruhina', 'ruhina', 'ruhina', '+916788999000', 0, '2022-03-04 00:00:00'),
(2, 'admin', 'admin', 'admin', '+789656778', 1, '2022-03-04 00:00:00'),
(3, 'user3', 'user3', 'user3', '+98907654', 0, '2022-03-04 00:00:00'),
(4, 'user4', 'user4', 'user4', '+45678900', 0, '2022-03-04 00:00:00'),
(5, '', 'zain@gmail.com', 'zain', '8756789', 0, '2022-03-04 00:00:00'),
(6, 'zayed', 'zayed@gmail.com', 'zayed', '97234561', 0, '2022-03-04 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
