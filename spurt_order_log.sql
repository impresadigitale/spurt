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
-- Table structure for table `order_log`
--

DROP TABLE IF EXISTS `order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_log` (
  `order_log_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `currency_id` int DEFAULT NULL,
  `shipping_zone_id` int DEFAULT NULL,
  `payment_zone_id` int DEFAULT NULL,
  `shipping_country_id` int DEFAULT NULL,
  `payment_country_id` int DEFAULT NULL,
  `invoice_no` varchar(45) DEFAULT NULL,
  `invoice_prefix` varchar(26) DEFAULT NULL,
  `order_prefix_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) DEFAULT NULL,
  `email` varchar(96) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `shipping_firstname` varchar(32) DEFAULT NULL,
  `shipping_lastname` varchar(32) DEFAULT NULL,
  `shipping_company` varchar(32) DEFAULT NULL,
  `shipping_address_1` varchar(128) DEFAULT NULL,
  `shipping_address_2` varchar(128) DEFAULT NULL,
  `shipping_city` varchar(128) DEFAULT NULL,
  `shipping_postcode` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(128) DEFAULT NULL,
  `shipping_zone` varchar(128) DEFAULT NULL,
  `shipping_address_format` text,
  `shipping_method` varchar(128) DEFAULT NULL,
  `payment_firstname` varchar(32) DEFAULT NULL,
  `payment_lastname` varchar(32) DEFAULT NULL,
  `payment_company` varchar(32) DEFAULT NULL,
  `payment_address_1` varchar(128) DEFAULT NULL,
  `payment_address_2` varchar(128) DEFAULT NULL,
  `payment_city` varchar(128) DEFAULT NULL,
  `payment_postcode` varchar(10) DEFAULT NULL,
  `payment_country` varchar(128) DEFAULT NULL,
  `payment_zone` varchar(128) DEFAULT NULL,
  `payment_address_format` text,
  `payment_method` varchar(128) DEFAULT NULL,
  `comment` text,
  `total` decimal(15,2) DEFAULT NULL,
  `reward` int DEFAULT NULL,
  `order_status_id` int DEFAULT NULL,
  `affiliate_id` int DEFAULT NULL,
  `commision` decimal(10,0) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_value` decimal(11,0) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `payment_flag` int DEFAULT NULL,
  `order_name` varchar(32) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`order_log_id`),
  KEY `fk_order_customer1` (`customer_id`),
  KEY `fk_order_currency1` (`currency_id`),
  KEY `order_log_id` (`order_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_log`
--

LOCK TABLES `order_log` WRITE;
/*!40000 ALTER TABLE `order_log` DISABLE KEYS */;
INSERT INTO `order_log` VALUES (1,1,NULL,NULL,NULL,99,NULL,NULL,'SPU',NULL,NULL,NULL,'demo@gmail.com','9876543870',NULL,'demo','','','dfgh','oiuy','lkjh','111111','India','tamilnadu','',NULL,'demo','','','dfgh','oiuy','lkjh','111111','India','tamilnadu','','2',NULL,NULL,NULL,1,NULL,NULL,'USD',NULL,NULL,NULL,NULL,'1',NULL,NULL,'2020-12-03 20:37:24',NULL,NULL,1),(2,0,NULL,NULL,NULL,99,NULL,NULL,'SPU',NULL,NULL,NULL,'piccouser@gmail.com','8888888888',NULL,'Picco','user','Picco user','Xavier street','','Mumai','222222','India','Mumbai','',NULL,'Picco','user','Picco user','Xavier street','','Mumai','222222','India','Mumbai','','2',NULL,NULL,NULL,1,NULL,NULL,'USD',NULL,NULL,NULL,NULL,'1',NULL,NULL,'2021-03-22 17:03:59',NULL,NULL,2);
/*!40000 ALTER TABLE `order_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:32
