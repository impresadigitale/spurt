-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: spurt
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vendor_order_archive`
--

DROP TABLE IF EXISTS `vendor_order_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_order_archive` (
  `vendor_order_archive_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `sub_order_id` varchar(255) DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `commission` int DEFAULT '0',
  `order_product_id` int NOT NULL,
  PRIMARY KEY (`vendor_order_archive_id`),
  KEY `FK_71cf32310715a162fbe0a1d3ab4` (`vendor_id`),
  KEY `FK_4eb695729b08afef5b7794c176f` (`order_id`),
  KEY `FK_54e8ab35b68535a3f1bca9e0003` (`sub_order_status_id`),
  CONSTRAINT `FK_4eb695729b08afef5b7794c176f` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_54e8ab35b68535a3f1bca9e0003` FOREIGN KEY (`sub_order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_71cf32310715a162fbe0a1d3ab4` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_order_archive`
--

LOCK TABLES `vendor_order_archive` WRITE;
/*!40000 ALTER TABLE `vendor_order_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_order_archive` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:34
