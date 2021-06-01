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
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `settings_id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(250) DEFAULT NULL,
  `meta_tag_title` varchar(250) DEFAULT NULL,
  `meta_tag_description` text,
  `meta_tag_keywords` varchar(250) DEFAULT NULL,
  `store_name` varchar(250) DEFAULT NULL,
  `store_owner` varchar(250) DEFAULT NULL,
  `store_address` text,
  `country_id` int DEFAULT NULL,
  `zone_id` varchar(255) DEFAULT NULL,
  `store_email` varchar(250) DEFAULT NULL,
  `store_telephone` varchar(50) DEFAULT NULL,
  `store_fax` varchar(30) DEFAULT NULL,
  `store_logo` varchar(250) DEFAULT NULL,
  `store_logo_path` varchar(255) DEFAULT NULL,
  `maintenance_mode` int DEFAULT NULL,
  `store_language_name` varchar(250) DEFAULT NULL,
  `store_currency_id` int DEFAULT NULL,
  `store_image` varchar(255) DEFAULT NULL,
  `store_image_path` text,
  `google` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `order_status` int NOT NULL DEFAULT '1',
  `invoice_prefix` varchar(255) DEFAULT NULL,
  `items_per_page` int DEFAULT NULL,
  `category_product_count` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `email_logo` varchar(255) DEFAULT NULL,
  `email_logo_path` varchar(255) DEFAULT NULL,
  `invoice_logo` varchar(255) DEFAULT NULL,
  `invoice_logo_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`settings_id`),
  KEY `fk_Country_Settings` (`country_id`),
  KEY `settings_id` (`settings_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (2,'www.spurt.com','Gruppo Piccirillo','','outlet dell\'auto','Gruppo Piccirillo','Admin','Chennai, India',105,'66','support@spurtcommerce.com','9840322505','1221','Img_1622210248278.png','storeLogo/',0,'Italiano',65,'storeImage',NULL,'','https://www.facebook.com/gruppopiccirillo/','','https://www.instagram.com/gruppopiccirillo/',1,'SPU',20,1,1,'2019-02-13 06:00:00','2021-05-29 16:40:26',NULL,NULL,'EmailLogo_1622210531121.png','storeLogo/','InvoiceLogo_1622210511927.png','storeLogo/');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
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
