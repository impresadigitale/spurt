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
-- Table structure for table `plugins`
--

DROP TABLE IF EXISTS `plugins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plugins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plugin_name` varchar(60) DEFAULT NULL,
  `plugin_avatar` varchar(255) DEFAULT NULL,
  `plugin_avatar_path` varchar(255) DEFAULT NULL,
  `plugin_type` varchar(60) DEFAULT NULL,
  `plugin_additional_info` text,
  `plugin_status` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plugins`
--

LOCK TABLES `plugins` WRITE;
/*!40000 ALTER TABLE `plugins` DISABLE KEYS */;
INSERT INTO `plugins` VALUES (1,'paypal','Img_1564650679795.png','logo/','payment','{\"merchantId\":\"\",\"defaultRoute\":\"/paypal\",\"processRoute\":\"/paypal-payment/process\",\"successRoute\":\"/paypal-payment/success\",\"cancelRoute\":\"/paypal-payment/cancel\",\"failureRoute\":\"/paypal-payment/failure\",\"isTest\":\"1\",\"clientId\":\"\",\"clientSecret\":\"\"}',1,NULL,NULL,'2020-06-08 13:02:11',NULL),(2,'CashOnDelivery','Img_1564659191615.jpeg','logo/','payment',NULL,1,NULL,NULL,NULL,NULL),(3,'gmail','Img_1564575462680.jpeg','logo/','oauth','{\"isTest\":\"1\",\"clientId\":\"\",\"defaultRoute\":\"/gmail-login\"}',1,NULL,NULL,'2019-08-15 05:48:37',NULL),(4,'facebook','Img_1564575414973.png','logo/','oauth','{\"isTest\":\"1\",\"AppId\":\"\",\"AppSecretKey\":\"\",\"defaultRoute\":\"/facebook-login\"}',1,NULL,NULL,'2019-08-15 06:06:51',NULL),(5,'razorpay','Img_1567002487693.png','logo/','payment','{\"defaultRoute\":\"/razorpay\",\"processRoute\":\"/razorpay-payment/process\",\"successRoute\":\"/razorpay-payment/success\",\"cancelRoute\":\"/razorpay-payment/cancel\",\"failureRoute\":\"/razorpay-payment/failure\",\"processAPIRoute\":\"/razorpay-payment/process-api\",\"successAPIRoute\":\"/razorpay-payment/success-api\",\"cancelAPIRoute\":\"/razorpay-payment/cancel-api\",\"failureAPIRoute\":\"/razorpay-payment/failure-api\",\"clientId\":\"\",\"clientSecret\":\"\",\"isTest\":\"1\"}',1,NULL,NULL,NULL,NULL),(6,'stripe','Img_1567002127693.png','logo/','payment','{\"defaultRoute\":\"/stripe\",\"processRoute\":\"/stripe-payment/process\",\"successRoute\":\"/stripe-payment/success\",\"cancelRoute\":\"/stripe-payment/cancel\",\"failureRoute\":\"/stripe-payment/failure\",\"isTest\":\"1\",\"clientId\":\"\",\"clientSecret\":\"\"}',1,NULL,NULL,'2020-02-05 12:54:09',NULL);
/*!40000 ALTER TABLE `plugins` ENABLE KEYS */;
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
