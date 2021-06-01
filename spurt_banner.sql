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
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `sort_order` varchar(255) DEFAULT NULL,
  `url` tinytext,
  `banner_group_id` int DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `view_page_count` int DEFAULT '0',
  `banner_group_banner_group_id` int NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `content` text,
  `position` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`banner_id`),
  KEY `fk_BannerGroup_Banner` (`banner_group_id`),
  KEY `banner_id` (`banner_id`),
  CONSTRAINT `fk_BannerGroup_Banner` FOREIGN KEY (`banner_group_id`) REFERENCES `banner_group` (`banner_group_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (83,'3',NULL,NULL,NULL,NULL,0,0,'','Img_1621008837513.jpeg','banner/','',1,1,'2019-08-01 12:59:54','2021-05-14 18:13:57',NULL,NULL),(84,'2',NULL,NULL,NULL,NULL,0,0,'','Img_1621008738247.jpeg','banner/','',1,1,'2019-08-01 13:02:28','2021-05-14 18:12:18',NULL,NULL),(85,'1',NULL,NULL,NULL,NULL,0,0,'http://localhost:4200/blogs','Img_1621008682314.jpeg','banner/','',1,1,'2019-08-01 13:03:28','2021-05-14 18:11:56',NULL,NULL),(86,'special offers',NULL,NULL,NULL,NULL,0,0,'www.piccosoft.com','Img_1551871740879.jpeg','banner/','<p>20%</p>\n',2,0,'2019-08-01 13:04:26','2021-05-14 18:14:02',NULL,NULL);
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:40
