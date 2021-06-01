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
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `vendor_prefix_id` varchar(255) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `commission` int DEFAULT NULL,
  `company_name` varchar(512) DEFAULT NULL,
  `company_location` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_logo_path` varchar(255) DEFAULT NULL,
  `company_description` text,
  `payment_method` int DEFAULT NULL,
  `cheque_payee_name` varchar(255) DEFAULT NULL,
  `paypal_email_account` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `approval_flag` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `contact_person_name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company_address1` varchar(255) DEFAULT NULL,
  `company_address2` varchar(255) DEFAULT NULL,
  `company_city` varchar(255) DEFAULT NULL,
  `company_state` varchar(255) DEFAULT NULL,
  `company_country_id` int DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `company_mobile_number` bigint DEFAULT NULL,
  `company_email_id` varchar(255) DEFAULT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `company_gst_number` varchar(255) DEFAULT NULL,
  `company_pan_number` varchar(255) DEFAULT NULL,
  `payment_information` varchar(255) DEFAULT NULL,
  `vendor_slug_name` varchar(255) DEFAULT NULL,
  `company_cover_image` varchar(255) DEFAULT NULL,
  `company_cover_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`),
  KEY `fk_tbl_vendor_tbl_customer_foreignKey` (`customer_id`),
  CONSTRAINT `fk_tbl_vendor_tbl_customer_foreignKey` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:35
