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
-- Table structure for table `permission_module_group`
--

DROP TABLE IF EXISTS `permission_module_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_module_group` (
  `module_group_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `slug_name` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`module_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_module_group`
--

LOCK TABLES `permission_module_group` WRITE;
/*!40000 ALTER TABLE `permission_module_group` DISABLE KEYS */;
INSERT INTO `permission_module_group` VALUES (1,'Order','order',1,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(2,'Product','product',2,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(3,'Categories','categories',3,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(4,'Product Options','product-options',4,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(5,'Rating Review','rating-review',5,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(6,'Customer','customer',6,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(7,'Customer Group','customer-group',7,NULL,'2020-03-13 14:27:44',NULL,'2020-03-13 14:27:44'),(8,'Pages','pages',8,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(9,'Banners','banners',9,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(10,'Services','services',10,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(11,'Service Category','service-category',11,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(12,'Service Enquiry','service-enquiry',12,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(13,'Service Lead','service-lead',13,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(14,'Setting Role','setting-role',14,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(15,'Setting Users','setting-users',15,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(16,'Setting General Settings','setting-general-settings',16,NULL,'2020-03-13 14:41:15',NULL,'2020-03-13 14:41:15'),(17,'Setting Personalize','setting-personalize',17,NULL,'2020-03-13 14:46:15',NULL,'2020-03-13 14:46:15'),(18,'Setting Site Setting','setting-site-setting',18,NULL,'2020-03-13 14:46:15',NULL,'2020-03-13 14:46:15'),(19,'Setting Zone','setting-zone',19,NULL,'2020-03-13 14:46:15',NULL,'2020-03-13 14:46:15'),(20,'Market Place Vendor','market-place-vendor',20,NULL,'2020-03-13 14:58:31',NULL,'2020-03-13 14:58:31'),(21,'Market Place Product','market-place-product',21,NULL,'2020-03-13 14:58:31',NULL,'2020-03-13 14:58:31'),(22,'Market Place Setting','market-place-setting',22,NULL,'2020-03-13 14:58:31',NULL,'2020-03-13 14:58:31'),(23,'Market Place Sales','market-place-sales',23,NULL,'2020-03-13 14:58:31',NULL,'2020-03-13 14:58:31'),(24,'Market Place Payment','market-place-payment',24,NULL,'2020-03-13 14:58:31',NULL,'2020-03-13 14:58:31'),(25,'Setting Currency','setting-currency',25,NULL,'2020-03-16 16:23:09',NULL,'2020-03-16 16:23:09'),(26,'Settings Tax','settings-tax',26,NULL,'2020-03-16 16:23:09',NULL,'2020-03-16 16:23:09'),(27,'Settings Country','settings-country',27,NULL,'2020-03-16 16:30:25',NULL,'2020-03-16 16:30:25'),(28,'Settings Language','settings-language',28,NULL,'2020-03-16 16:30:25',NULL,'2020-03-16 16:30:25'),(29,'Settings Order Status','settings-order-status',29,NULL,'2020-03-16 16:36:38',NULL,'2020-03-16 16:36:38'),(30,'Settings Stock Status','settings-stock-status',30,NULL,'2020-03-16 16:36:38',NULL,'2020-03-16 16:36:38'),(31,'Settings Email Template','settings-email-template',31,NULL,'2020-03-16 16:38:10',NULL,'2020-03-16 16:38:10'),(32,'Payments','payments',32,NULL,'2020-03-19 14:53:40',NULL,'2020-03-19 14:53:40'),(33,'Brands','brands',33,NULL,'2020-03-19 15:03:15',NULL,'2020-03-19 15:03:15'),(34,'Coupon','coupon',34,NULL,'2020-03-19 15:11:48',NULL,'2020-03-19 15:11:48'),(35,'Blogs','blogs',35,NULL,'2020-03-19 15:22:04',NULL,'2020-03-19 15:22:04');
/*!40000 ALTER TABLE `permission_module_group` ENABLE KEYS */;
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
