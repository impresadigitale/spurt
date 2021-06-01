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
-- Table structure for table `delivery_location_to_location`
--

DROP TABLE IF EXISTS `delivery_location_to_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_location_to_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_location_id` int NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `delivery_location_id` (`delivery_location_id`),
  CONSTRAINT `delivery_location_to_location_ibfk_1` FOREIGN KEY (`delivery_location_id`) REFERENCES `delivery_location` (`delivery_location_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tbl_delivery_location_tbl_delivery_location_to_location` FOREIGN KEY (`delivery_location_id`) REFERENCES `delivery_location` (`delivery_location_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_location_to_location`
--

LOCK TABLES `delivery_location_to_location` WRITE;
/*!40000 ALTER TABLE `delivery_location_to_location` DISABLE KEYS */;
INSERT INTO `delivery_location_to_location` VALUES (21,24,'test',NULL,'2020-03-05 06:04:12',NULL,'2020-03-05 06:04:12'),(23,26,'test1',NULL,'2020-03-05 06:20:14',NULL,'2020-03-05 06:20:14'),(26,27,'chenai',NULL,'2020-03-05 06:45:53',NULL,'2020-03-05 06:45:53');
/*!40000 ALTER TABLE `delivery_location_to_location` ENABLE KEYS */;
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
