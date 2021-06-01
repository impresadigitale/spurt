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
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `container_name` varchar(255) DEFAULT NULL,
  `default_image` int DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`product_image_id`),
  KEY `fk_product_image_product1` (`product_id`),
  KEY `product_image_id` (`product_image_id`),
  KEY `default_image` (`default_image`),
  CONSTRAINT `fk_product_image_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3950 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (3829,559,'Img_1622240593804.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3830,559,'Img_1622240590992.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3831,559,'Img_1622240587712.jpeg','auto/f8 tributo/ferrari roma/',1,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3832,559,'Img_1622240583915.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3833,559,'Img_1622240577445.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3834,559,'Img_1622240575187.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3835,559,'Img_1622240570565.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3836,559,'Img_1622240597780.jpeg','auto/f8 tributo/ferrari roma/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:29',NULL),(3837,558,'Img_1621033079004.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3838,558,'Img_1621033118932.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3839,558,'Img_1621033084901.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3840,558,'Img_1621033087261.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3841,558,'Img_1621033092435.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3842,558,'Img_1621033095097.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3843,558,'Img_1621033101644.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3844,558,'Img_1621033104824.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3845,558,'Img_1621033132724.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3846,558,'Img_1621033129178.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3847,558,'Img_1621033125307.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3848,558,'Img_1621033115090.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3849,558,'Img_1621033111296.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3850,558,'Img_1621033107834.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3851,558,'Img_1621033136499.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3852,558,'Img_1621033139160.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3853,558,'Img_1621033142996.jpeg','auto/f8 tributo/',1,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3854,558,'Img_1621033145573.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3855,558,'Img_1621033148350.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3856,558,'Img_1621033152333.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3857,558,'Img_1621033156965.jpeg','auto/f8 tributo/',0,NULL,NULL,NULL,NULL,'2021-05-29 16:12:33',NULL),(3892,560,'Img_1622240818726.jpeg','auto/fdsf/',1,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3893,560,'Img_1622240822407.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3894,560,'Img_1622240826591.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3895,560,'Img_1622240830099.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3896,560,'Img_1622240834649.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3897,560,'Img_1622240838854.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3898,560,'Img_1622240841812.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3899,560,'Img_1622240845541.jpeg','auto/fdsf/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:13:40',NULL),(3914,562,'Img_1622507107473.jpeg','auto/serie 1/',1,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3915,562,'Img_1622507435216.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3916,562,'Img_1622507438194.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3917,562,'Img_1622507442337.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3918,562,'Img_1622507446447.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3919,562,'Img_1622507450862.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3920,562,'Img_1622507456071.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3921,562,'Img_1622507483114.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3922,562,'Img_1622507479686.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3923,562,'Img_1622507475829.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3924,562,'Img_1622507471900.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3925,562,'Img_1622507468876.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3926,562,'Img_1622507463293.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3927,562,'Img_1622507458710.jpeg','auto/serie 1/',NULL,NULL,NULL,NULL,NULL,'2021-06-01 03:15:49',NULL),(3939,563,'Img_1622510223103.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3940,563,'Img_1622510227158.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3941,563,'Img_1622510231795.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3942,563,'Img_1622510234495.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3943,563,'Img_1622510219472.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3944,563,'Img_1622510216143.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3945,563,'Img_1622510213532.jpeg','auto/fiat tipo/',1,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3946,563,'Img_1622510238502.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3947,563,'Img_1622510242127.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3948,563,'Img_1622510246063.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL),(3949,563,'Img_1622510250001.jpeg','auto/fiat tipo/',0,NULL,NULL,NULL,NULL,'2021-06-01 03:21:24',NULL);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
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