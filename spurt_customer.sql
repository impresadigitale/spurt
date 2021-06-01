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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(512) DEFAULT NULL,
  `last_name` varchar(512) DEFAULT NULL,
  `username` varchar(512) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_path` tinytext,
  `mail_status` int DEFAULT NULL,
  `delete_flag` int DEFAULT '0',
  `customer_group_id` int DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `newsletter` int DEFAULT NULL,
  `safe` int DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  `oauth_data` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'demo',NULL,'demo@gmail.com','demo@gmail.com','$2b$10$/7MmJDnJ7FcYsOOAnIQwPeevZQPlP9TqjMm92ZC/kahsJFrnfMGs2','9876543870',NULL,NULL,NULL,NULL,NULL,NULL,1,0,1,'2020-12-03 20:33:14',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,'2020-07-15 12:10:43','2020-12-03 20:33:14');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:45
