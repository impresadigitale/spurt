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
-- Table structure for table `payment_items_archive`
--

DROP TABLE IF EXISTS `payment_items_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_items_archive` (
  `payment_item_archive_id` int NOT NULL AUTO_INCREMENT,
  `payment_archive_id` int DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_item_archive_id`),
  KEY `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` (`payment_archive_id`),
  KEY `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` (`order_product_id`),
  CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_paymentItemsArchive_tbl_payment_foreignKey` FOREIGN KEY (`payment_archive_id`) REFERENCES `payment_archive` (`payment_archive_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_items_archive`
--

LOCK TABLES `payment_items_archive` WRITE;
/*!40000 ALTER TABLE `payment_items_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_items_archive` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:41
