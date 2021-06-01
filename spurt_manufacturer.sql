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
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `manufacturer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`manufacturer_id`),
  KEY `manufacturer_id` (`manufacturer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (83,'Porsche','Img_1622240935014.png','manufacturer/',1,1,NULL,NULL,'2019-05-06 06:43:04','2021-05-29 00:28:55'),(89,'Ferrari','Img_1622204562241.png','manufacturer/',5,1,NULL,NULL,'2019-05-06 06:45:09','2021-05-31 20:45:03'),(96,'Abarth','Img_1620923160714.png','manufacturer/',1,1,NULL,NULL,'2019-05-09 06:34:33','2021-05-13 18:26:00'),(97,'AUDI','Img_1622486523510.png','manufacturer/',1,1,NULL,NULL,'2021-05-14 16:07:52','2021-05-31 20:42:03'),(98,'Lamborghini','Img_1622486307551.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:38:27',NULL),(99,'BMW','Img_1622486335769.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:38:55',NULL),(100,'Seat','Img_1622486355792.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:39:15',NULL),(101,'Lancia','Img_1622486368577.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:39:28',NULL),(102,'Land rover','Img_1622486404861.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:40:04',NULL),(103,'Opel','Img_1622486546218.png','manufacturer/',4,1,NULL,NULL,'2021-05-31 20:42:26','2021-05-31 20:44:58'),(104,'Mc laren','Img_1622486574453.png','manufacturer/',3,1,NULL,NULL,'2021-05-31 20:42:54','2021-05-31 20:44:50'),(105,'Jeep','Img_1622486598880.png','manufacturer/',2,1,NULL,NULL,'2021-05-31 20:43:18','2021-05-31 20:44:37'),(106,'Ford','Img_1622486608623.png','manufacturer/',1,1,NULL,NULL,'2021-05-31 20:43:28',NULL);
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:39
