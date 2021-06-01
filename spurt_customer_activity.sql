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
-- Table structure for table `customer_activity`
--

DROP TABLE IF EXISTS `customer_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_activity` (
  `customer_activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customer_activity_id`),
  KEY `fk_tbl_customer_activity_tbl_customer` (`customer_id`),
  CONSTRAINT `fk_tbl_customer_activity_tbl_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_activity`
--

LOCK TABLES `customer_activity` WRITE;
/*!40000 ALTER TABLE `customer_activity` DISABLE KEYS */;
INSERT INTO `customer_activity` VALUES (1,1,1,NULL,NULL,NULL,'2020-07-15 13:42:20','2020-07-15 13:42:20','loggedIn'),(2,2,1,542,NULL,NULL,'2020-07-15 13:42:37','2020-07-15 13:42:37','productviewed'),(3,1,1,NULL,NULL,NULL,'2020-12-03 20:33:14','2020-12-03 20:33:14','loggedIn'),(4,2,1,542,NULL,NULL,'2020-12-03 20:33:25','2020-12-03 20:33:25','productviewed'),(5,2,1,542,NULL,NULL,'2020-12-03 20:33:48','2020-12-03 20:33:48','productviewed'),(6,2,1,542,NULL,NULL,'2020-12-03 20:34:01','2020-12-03 20:34:01','productviewed'),(7,2,1,555,NULL,NULL,'2020-12-03 20:34:57','2020-12-03 20:34:57','productviewed'),(8,2,1,554,NULL,NULL,'2020-12-03 20:35:22','2020-12-03 20:35:22','productviewed');
/*!40000 ALTER TABLE `customer_activity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:37
