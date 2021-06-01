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
-- Table structure for table `vendor_orders`
--

DROP TABLE IF EXISTS `vendor_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_orders` (
  `vendor_order_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `sub_order_id` varchar(255) DEFAULT NULL,
  `sub_order_status_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `order_product_id` int DEFAULT NULL,
  `commission` int DEFAULT '0',
  `make_settlement` int DEFAULT '0',
  PRIMARY KEY (`vendor_order_id`),
  KEY `FK_278a24fad52a1cb864326bf8480` (`vendor_id`),
  KEY `FK_5044c3c237f11946768a05a6a50` (`order_id`),
  KEY `fk_tbl_order_product_tbl_vendor_order_foreignKey` (`order_product_id`),
  CONSTRAINT `FK_278a24fad52a1cb864326bf8480` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_5044c3c237f11946768a05a6a50` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_order_product_tbl_vendor_order_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_orders`
--

LOCK TABLES `vendor_orders` WRITE;
/*!40000 ALTER TABLE `vendor_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:35
