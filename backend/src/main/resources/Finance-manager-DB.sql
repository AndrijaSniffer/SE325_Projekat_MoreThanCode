-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.32 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table finance_manager.expenses: ~14 rows (approximately)
INSERT INTO `expenses` (`expense_id`, `user_id`, `date`, `shop`, `cost`) VALUES
	(52, 1, '2023-01-01 00:00:00', 'Idea', 2500),
	(53, 1, '2023-01-20 00:00:00', 'Idea', 10000),
	(54, 1, '2023-01-13 00:00:00', 'Idea', 12000),
	(55, 1, '2023-02-01 00:00:00', 'Metro', 30000),
	(56, 1, '2023-03-01 00:00:00', 'Sport vision', 8000),
	(57, 1, '2023-03-16 00:00:00', 'Under armour', 15000),
	(58, 1, '2023-03-25 00:00:00', 'Idea', 7000),
	(59, 1, '2023-04-01 00:00:00', 'Idea', 1000),
	(60, 1, '2023-04-22 00:00:00', 'Idea', 120),
	(61, 1, '2023-04-29 00:00:00', 'Metro', 22000),
	(62, 1, '2023-05-19 00:00:00', 'Idea', 24000),
	(63, 1, '2023-06-15 00:00:00', 'Metro', 11000),
	(64, 1, '2023-06-30 00:00:00', 'Gigatron', 50000),
	(65, 1, '2023-02-17 00:00:00', 'Metro', 17000);

-- Dumping data for table finance_manager.expense_sequence: ~0 rows (approximately)
INSERT INTO `expense_sequence` (`next_val`) VALUES
	(151);

-- Dumping data for table finance_manager.hibernate_sequence: ~0 rows (approximately)
INSERT INTO `hibernate_sequence` (`next_val`) VALUES
	(2);

-- Dumping data for table finance_manager.incomes: ~8 rows (approximately)
INSERT INTO `incomes` (`income_id`, `user_id`, `date`, `source`, `earning`) VALUES
	(1, 1, '2023-05-01 09:37:13', 'Posao', 110000),
	(4, 1, '2023-01-01 00:00:00', 'Posao', 110000),
	(5, 1, '2023-02-01 00:00:00', 'Posao', 110000),
	(6, 1, '2023-03-01 00:00:00', 'Posao', 110000),
	(7, 1, '2023-04-01 00:00:00', 'Posao', 110000),
	(8, 1, '2022-12-01 00:00:00', 'Posao', 110000),
	(9, 1, '2022-11-01 00:00:00', 'Posao', 110000),
	(10, 1, '2022-10-01 00:00:00', 'Posao', 110000),
	(11, 1, '2023-09-01 00:00:00', 'Posao', 110000),
	(12, 1, '2022-08-01 00:00:00', 'Posao', 110000);

-- Dumping data for table finance_manager.income_sequence: ~0 rows (approximately)
INSERT INTO `income_sequence` (`next_val`) VALUES
	(101);

-- Dumping data for table finance_manager.users: ~0 rows (approximately)
INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `password`) VALUES
	(1, 'Nikola', 'Becic', 'nikola.becic', '$2a$08$Hj8mOw677/TFnwS/WHZMZe16pKDRnnIJ0VFzPBGPLAdIbcDwxa4Ye');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
