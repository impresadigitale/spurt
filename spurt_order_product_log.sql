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
-- Table structure for table `order_product_log`
--

DROP TABLE IF EXISTS `order_product_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product_log` (
  `order_product_log_id` int NOT NULL AUTO_INCREMENT,
  `order_product_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `trace` decimal(15,4) DEFAULT NULL,
  `total` decimal(15,4) NOT NULL,
  `tax` decimal(15,4) DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `tracking_url` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_product_log_id`),
  KEY `fk_tbl_orderProductLog_tbl_orderProduct_foreignKey` (`order_product_id`),
  KEY `fk_tbl_orderProductLog_tbl_product_foreignKey` (`product_id`),
  KEY `fk_tbl_orderProductLog_tbl_order_foreignKey` (`order_id`),
  KEY `fk_tbl_orderProductLog_tbl_orderStatus_foreignKey` (`order_status_id`),
  CONSTRAINT `fk_tbl_orderProductLog_tbl_order_foreignKey` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_orderProductLog_tbl_orderProduct_foreignKey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`order_product_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_orderProductLog_tbl_orderStatus_foreignKey` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_orderProductLog_tbl_product_foreignKey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product_log`
--

LOCK TABLES `order_product_log` WRITE;
/*!40000 ALTER TABLE `order_product_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_product_log` ENABLE KEYS */;
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
