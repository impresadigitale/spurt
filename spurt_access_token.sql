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
-- Table structure for table `access_token`
--

DROP TABLE IF EXISTS `access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_token`
--

LOCK TABLES `access_token` WRITE;
/*!40000 ALTER TABLE `access_token` DISABLE KEYS */;
INSERT INTO `access_token` VALUES (1,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTU5NDc5NTEyMX0.z8Xq36YjEDa6A2ESmt4-QcURN62cv2bqAc-LnWVD2R8',NULL,'2020-07-15 12:08:41',NULL,NULL,NULL),(2,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwNjkwOTU0NX0.ObhJwjh6vL_OrUDjERffmlXRW_n9FppqmdkT3W9qbz8',NULL,'2020-12-02 17:15:45',NULL,NULL,NULL),(3,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwNjkyNTcxNn0.lPdPI9vfbR9Xq9t0ahrehMc57vrI9fAYuPgUUeI0qNI',NULL,'2020-12-02 21:45:16',NULL,NULL,NULL),(4,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwNzAwMzAyMX0.Q69ghrOaEpU0I485631l2cfJpMhLlmvkEBeW-peBhh8',NULL,'2020-12-03 19:13:41',NULL,NULL,NULL),(5,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwNzAwMzA0Nn0.yCbg18ZVgkLfnWgbtyHCnyOKBMe1NKUMCjJpCCHtdSU',NULL,'2020-12-03 19:14:06',NULL,NULL,NULL),(6,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYxNjQwNzIwNH0.X-DyFsljzLzu9qoeGQ8SCEDxFolH21ewiryLpqLC2eI',NULL,'2021-03-22 15:30:04',NULL,NULL,NULL),(7,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDY0MjM3Nn0.7A6crNv-CR8fh6ZPLUa0gWxL9Nb9QZRxU3zRn3QayPc',NULL,'2021-05-10 12:26:16',NULL,NULL,NULL),(8,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDY0Mjc0M30.nngw_WvedOZ8-XRM6WXlSlYE_GMkAWBUFzoyWzjz8_w',NULL,'2021-05-10 12:32:23',NULL,NULL,NULL),(9,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDY0NDQ0OH0.GnKb-t-zY9SoRJ1r1gciw1FXfIkwnukPzlQYhVaYDHI',NULL,'2021-05-10 13:00:48',NULL,NULL,NULL),(10,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDY0OTc4NX0.kS3cPo8yBGR4SnSxZMxjov__9Hi5ELMDJVYKvwkb0E4',NULL,'2021-05-10 14:29:45',NULL,NULL,NULL),(11,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDgyODQ3OX0.KGBt88gJdEmTs-iQeYsmFO0GJwklCe7Nr3z8EpYePhM',NULL,'2021-05-12 16:07:59',NULL,NULL,NULL),(12,49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYyMDk5ODg0Nn0.Ld7b4nFNh2z6rb0HCDDdwCdsPVGW-IVHAwJ5lghzwsA',NULL,'2021-05-14 15:27:26',NULL,NULL,NULL);
/*!40000 ALTER TABLE `access_token` ENABLE KEYS */;
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
