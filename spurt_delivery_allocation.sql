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
-- Table structure for table `delivery_allocation`
--

DROP TABLE IF EXISTS `delivery_allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_allocation` (
  `delivery_allocation_id` int NOT NULL AUTO_INCREMENT,
  `vendor_order_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `delivery_person_id` int DEFAULT NULL,
  `delivery_order_status_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`delivery_allocation_id`),
  KEY `FK_39e5842ba09b7ca3db20272b920` (`vendor_order_id`),
  KEY `FK_4eeb3b744eb7b40a361aaa84715` (`order_id`),
  KEY `FK_71863a43246b08e37ed2d27d5e8` (`delivery_person_id`),
  CONSTRAINT `FK_39e5842ba09b7ca3db20272b920` FOREIGN KEY (`vendor_order_id`) REFERENCES `vendor_orders` (`vendor_order_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4eeb3b744eb7b40a361aaa84715` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_71863a43246b08e37ed2d27d5e8` FOREIGN KEY (`delivery_person_id`) REFERENCES `delivery_person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_allocation`
--

LOCK TABLES `delivery_allocation` WRITE;
/*!40000 ALTER TABLE `delivery_allocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_allocation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:33
