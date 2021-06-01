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
-- Table structure for table `zz_lisfin`
--

DROP TABLE IF EXISTS `zz_lisfin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zz_lisfin` (
  `FLCODART` varchar(20) NOT NULL COMMENT 'Codice prodotto',
  `FLCODLIS` varchar(10) NOT NULL COMMENT 'Listino',
  `FLIMPORTO1` float(18,4) NOT NULL COMMENT 'Da importo',
  `FLIMPORTO2` float(18,4) NOT NULL COMMENT 'Ad importo',
  `FLIMPORTOF` float(18,4) NOT NULL COMMENT 'Importo finanziamento',
  `FLNUMRATE` int NOT NULL COMMENT 'Numero rate',
  `FLIMPRATA` float(18,4) NOT NULL COMMENT 'Importo rata',
  PRIMARY KEY (`FLCODLIS`),
  KEY `FLCODART` (`FLCODART`),
  CONSTRAINT `zz_lisfin_ibfk_1` FOREIGN KEY (`FLCODART`) REFERENCES `zz_artfin` (`FPCODART`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zz_lisfin`
--

LOCK TABLES `zz_lisfin` WRITE;
/*!40000 ALTER TABLE `zz_lisfin` DISABLE KEYS */;
/*!40000 ALTER TABLE `zz_lisfin` ENABLE KEYS */;
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
