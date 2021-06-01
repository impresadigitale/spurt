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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(64) DEFAULT NULL,
  `upc` varchar(12) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `stock_status_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_path` text,
  `manufacturer_id` int DEFAULT NULL,
  `shipping` tinyint DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `date_available` date DEFAULT NULL,
  `sort_order` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `amount` float DEFAULT NULL,
  `meta_tag_title` varchar(255) DEFAULT NULL,
  `meta_tag_description` varchar(255) DEFAULT NULL,
  `meta_tag_keyword` varchar(255) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `subtract_stock` int DEFAULT NULL COMMENT '0->no 1->yes',
  `minimum_quantity` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `wishlist_status` int DEFAULT NULL,
  `delete_flag` int NOT NULL DEFAULT '0',
  `is_featured` int DEFAULT NULL,
  `rating` decimal(10,2) DEFAULT NULL,
  `condition` int DEFAULT NULL COMMENT '1->new 2->used',
  `today_deals` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `price_update_file_log_id` int DEFAULT NULL,
  `product_slug` varchar(255) DEFAULT NULL,
  `service_charges` varchar(255) DEFAULT NULL,
  `tax_type` int DEFAULT NULL,
  `tax_value` int DEFAULT NULL,
  `order_product_prefix_id` int DEFAULT NULL,
  `height` decimal(15,2) DEFAULT NULL,
  `weight` decimal(15,2) DEFAULT NULL,
  `length` decimal(15,2) DEFAULT NULL,
  `width` decimal(15,2) DEFAULT NULL,
  `has_stock` int DEFAULT '0',
  `has_tire_price` int DEFAULT '0',
  `out_of_stock_threshold` int DEFAULT NULL,
  `notify_min_quantity_below` int DEFAULT NULL,
  `min_quantity_allowed_cart` int DEFAULT NULL,
  `max_quantity_allowed_cart` int DEFAULT NULL,
  `enable_back_orders` int DEFAULT NULL,
  `pincode_based_delivery` int DEFAULT '0',
  `sku_id` int DEFAULT NULL,
  `is_simplified` int DEFAULT NULL,
  `hsn` varchar(255) DEFAULT NULL,
  `attribute_keyword` text,
  PRIMARY KEY (`product_id`),
  KEY `product_id` (`product_id`),
  KEY `manufacturer_id` (`manufacturer_id`),
  KEY `condition` (`condition`),
  KEY `today_deals` (`today_deals`),
  KEY `is_featured` (`is_featured`),
  KEY `is_active` (`is_active`),
  KEY `fk_tbl_sku_tbl_product_foreignKey` (`sku_id`),
  CONSTRAINT `fk_tbl_sku_tbl_product_foreignKey` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=564 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (558,'1','',1,0,NULL,NULL,89,0,282000.00,NULL,1,'F8 Tributo 3.9 720 cv','',NULL,'','','',NULL,NULL,NULL,NULL,NULL,0,1,NULL,NULL,0,1,NULL,NULL,'2021-05-14 15:29:25','2021-06-01 03:14:07','~AUTO~,~F8 Tributo 3.9 720 cv~',NULL,'f8-tributo-39-720-cv','{\"productCost\":282000,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}',1,0,NULL,0.00,0.00,0.00,0.00,0,0,NULL,NULL,NULL,NULL,NULL,0,11,1,'',''),(559,'11561196','',1,0,NULL,NULL,89,0,269500.00,NULL,1,'FERRARI ROMA 3.9 F1 620 CV','',NULL,'','','',NULL,NULL,NULL,NULL,NULL,0,1,NULL,NULL,0,1,NULL,NULL,'2021-05-29 00:21:11','2021-06-01 03:14:06','~AUTO~,~FERRARI ROMA 3.9 F1 620 CV~',NULL,'ferrari-roma-39-f1-620-cv','{\"productCost\":269500,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}',1,0,NULL,0.00,0.00,0.00,0.00,0,0,NULL,NULL,NULL,NULL,NULL,0,12,1,'',''),(560,'06265169','20',1,0,NULL,NULL,83,0,150000.00,NULL,1,'911 4.0 GT3 RS auto 520cv Weissach Package','',NULL,'','','',NULL,NULL,NULL,NULL,NULL,0,1,NULL,NULL,0,1,NULL,NULL,'2021-05-29 00:28:02','2021-06-01 03:14:05','~KM 0~,~AFFARI DEL MESE~,~SERVIZI & ACCESSORI~,~911 4.0 GT3 RS auto 520cv Weissach Package~',NULL,'911-40-gt3-rs-auto-520cv-weissach-package','{\"productCost\":150000,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}',1,0,NULL,0.00,0.00,0.00,0.00,0,0,NULL,NULL,NULL,NULL,NULL,0,13,1,'201','~KW-383~,~CILINDRATA-3996~,~COLORE-verde~,~CARROZZERIA-Coupé~,~IMMATRICOLAZIONE-08-2018~,~PORTE-2~,~ALIMENTAZIONE-benzina~,~KM-1237~,~UBICAZIONE-CURTI~,~QUOT. EUROTAX-\\~,~TRASFERIMENTO PROPRIETÀ-ESCLUSO~,~ULTIMA REVISIONE-\\~'),(562,'10930','',1,0,NULL,NULL,99,0,29990.00,NULL,1,'116d M-Sport 5p 116cv auto (F40)','',NULL,'','','',NULL,NULL,NULL,NULL,NULL,0,0,NULL,NULL,1,1,NULL,NULL,'2021-06-01 02:23:56','2021-06-01 03:15:49','~116d M-Sport 5p 116cv auto (F40)~',NULL,'116d-m-sport-5p-116cv-auto-f401','{\"productCost\":29990,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}',1,0,NULL,0.00,0.00,0.00,0.00,0,0,NULL,NULL,NULL,NULL,NULL,0,15,1,'','~KW-85~,~CILINDRATA-1496~,~COLORE-C1D-STORM BAY\n\n~,~CARROZZERIA-berlina~,~IMMATRICOLAZIONE-02-2020~,~PORTE-5~,~ALIMENTAZIONE-DIESEL~,~KM-6400~,~UBICAZIONE-curti~,~QUOT. EUROTAX-\\~,~TRASFERIMENTO PROPRIETÀ-escluso~,~ULTIMA REVISIONE-\\~'),(563,'IT10471','',1,0,NULL,NULL,106,0,17990.00,NULL,1,'Tipo 1.0 Cross 100cv my21','',NULL,'','','',NULL,NULL,NULL,NULL,NULL,0,0,NULL,NULL,1,1,NULL,NULL,'2021-06-01 03:18:55','2021-06-01 03:21:24','~Tipo 1.0 Cross 100cv my21~',NULL,'tipo-10-cross-100cv-my21','{\"productCost\":17990,\"packingCost\":0,\"shippingCost\":0,\"tax\":0,\"others\":0}',1,0,NULL,0.00,0.00,0.00,0.00,0,0,NULL,NULL,NULL,NULL,NULL,0,16,1,'','~KW-74~,~CILINDRATA-999~,~COLORE-GRIGIO METROPOLI\n\n~,~CARROZZERIA-Crossover~,~IMMATRICOLAZIONE-03-2021~,~PORTE-~,~ALIMENTAZIONE-benzina~,~KM-1~,~UBICAZIONE-Curti~,~QUOT. EUROTAX-\\~,~TRASFERIMENTO PROPRIETÀ-escluso~,~ULTIMA REVISIONE-\\~');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
