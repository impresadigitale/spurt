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
-- Table structure for table `email_template`
--

DROP TABLE IF EXISTS `email_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shortname` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text,
  `is_active` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_template`
--

LOCK TABLES `email_template` WRITE;
/*!40000 ALTER TABLE `email_template` DISABLE KEYS */;
INSERT INTO `email_template` VALUES (1,'Register Content','Registration Successfully','Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Thank you for expressing your interest and registering with Spurtcommerce, the faster roadway for a smarter eCommerce drive.   </p>',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(2,'Forgot Password Content','Forgot Password','Dear {name},<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Your new Password is :  {xxxxxx}  </p>',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(3,'Contact Content','ContactUs','Dear Admin,<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You just received an enquiry from {name} and the details are here: <br> Details: <br> Email: {email}, <br> Phone Number : {phoneNumber}, <br> Message : {message}.  </p>',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(4,'Create Customer Content','User Login','Dear {name},<br/><br/>    We are glad to inform you that Spurtcommerce  has added you as Customer.Here are your User Credentials for logging into the Application <br>     <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  User ID : {username}</p>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  Password : {password}</p> <br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You may login using the above Email Id and Password. </p>',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(5,'Customer Order Content','Details of your recent Order','Dear {name},        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> Order successfully placed.        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> You have successfully placed an order for customization services. Kindly find the following details on the placed order.    </tr></tbody></table></td></tr> ',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(6,'Admin Mail Content','Congratulations on your recent order','Dear {adminname},        </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> A new order has been placed.         </td>    </tr>    <tr>        <td dir=\'ltr\' style=\'padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: \'Roboto\', sans-serif;\' valign=\'top\'> The new order {orderId} from the Customer {name} has been successfully placed. Kindly find the following details on the placed order.    </tr> </tbody></table></td> </tr> ',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(7,'Create admin user Content','Login credential',' <p>Dear {name}, <br />&nbsp;</p><p>We are glad to inform you that Spurtcommerce has added you as admin User.Here are your User Credentials for logging into the Application</p><p>User ID : {username}</p><p>Password : {password}</p><p>&nbsp;</p><p>You may login using the above Email Id and Password.</p><p>&nbsp;</p>',1,'2019-08-03 12:46:18','2019-08-03 12:46:18',NULL,NULL),(8,'service Enquiry','User enquiry for service','<p>Dear Admin,<br />&nbsp;</p><p>Some one gave service enquiry for <u>{title}</u>,</p><p><i>Comments</i> : {comments}</p><b><i>User Details:</i></b><br>Name: {name},<br> Email: {email},<br>mobile: {mobile}<br><p>&nbsp;</p><p>&nbsp;</p>',1,'2019-08-03 12:57:30','2019-08-03 12:57:30',NULL,NULL),(9,'Oauth register mail','Oauth register mail','Dear {name},<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Thankyou for showing your interest in SpurtCommerce, your temporary password for next time login is :  {xxxxxx} or you can login through Oauth </p>',1,'2019-08-08 00:00:00','2019-08-08 18:45:15',NULL,NULL),(10,'Oauth register mail','Oauth register mail','Dear {name},<br/><br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Thankyou for showing your interest in SpurtCommerce, your temporary password for next time login is :  {xxxxxx} or you can login through Oauth. </p>',1,'2019-08-08 00:00:00','2019-08-08 18:45:17',NULL,NULL),(11,'vendor Registration','vendor Registration','Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Thank you for expressing your interest and registering with Spurtcommerce for selling your products.   </p>',1,'2019-10-23 16:51:58','2019-10-23 16:51:58',NULL,NULL),(12,'admin notification for vendor registration','admin notification for vendor registration','Dear Admin,<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> {vendorName} registered with Spurtcommerce for selling their products, please approve that vendor in admin portal for allowing their further activity in spurtcommerce vendor portal.   </p>',1,'2019-10-23 16:51:58','2019-10-23 16:51:58',NULL,NULL),(13,'vendor creation','vendor creation','Dear {name},<br/><br/>    We are glad to inform you that Spurtcommerce  has added you as Vendor.Here are your User Credentials for logging into the Application <br>     <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  User ID : {username}</p>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;\'>  Password : {password}</p> <br/>        <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> You may login using the above Email Id and Password. </p>',1,'2019-10-29 15:54:55','2019-10-29 15:54:55',NULL,NULL),(14,'delivery person creation','you are created as delivery person','Dear {name},<br/><br/>    We are glad to inform you that Vendor {vendorname}  has added you as Delivery Person. You can login with your mobile number.',1,'2019-11-19 14:52:00','2019-11-19 14:52:00',NULL,NULL),(15,'vendor login Request','vendor login Request','Dear {name},<br/><br/>  {sitename}  approved you as a Vendor.Please click on the below link for login into vendor portal.<br />\r\n<p><a href=\"https://www.spurtcart.com\" target=\"_blank\">https://www.spurtcart.com</a></p><br />\r\n<p>If you have problems following the link, please copy and paste it into your browser to login into vendor portal.</p><br />\r\n',1,'2019-11-21 12:10:48','2019-11-21 12:10:48',NULL,NULL),(16,'product approval mail','product approval mail','Dear {name},<br/><br/>  {sitename}  approved your product - {productname}.Your product is ready for buying.Enjoy!<br />',1,'2019-11-29 07:06:02','2019-11-29 07:06:02',NULL,NULL),(17,'Email posting question','Email posting question','<p>Dear {name},<br />&nbsp;</p><p>Some one posted question for your product <u>{title}</u>,</p><p><i>Question</i> : {question}</p><b><i>User Name:</i></b><br>Name: {username}<p>&nbsp;</p><p>&nbsp;</p>',1,'2020-03-21 11:02:56','2020-03-21 11:02:56',NULL,NULL),(18,'Email posting answer','Email posting answer','<p>Dear {name},<br />&nbsp;</p><p>Some one posted answer for your product <u>{title}</u>,<br></p><p><i>Question</i> : {question}</p></p><p><i>Answer</i> : {answer}</p><br><b><i>User Name:</i></b><br>Name: {username}<p>&nbsp;</p><p>&nbsp;</p>',1,'2020-03-21 11:03:00','2020-03-21 11:03:00',NULL,NULL),(19,'Report Abuse','Report Abuse','<p>Dear {name},<br />&nbsp;</p><p>{username} posted Report Abuse for your product <u>{title}</u>,<br></p><p><i>Question</i> : {question}</p></p><p><i>Answer</i> : {answer}</p><br>',1,'2020-04-20 17:56:35','2020-04-20 17:56:35',NULL,NULL),(20,'updated cancel request status','Updation mail for your cancel order request','Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Your request for cancelling ordered product: {productname} is {status} by admin.   </p>',1,'2020-05-08 12:25:57','2020-05-08 12:25:57',NULL,NULL),(21,'order status change update',' Order Status change update','Hello {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Here is a new update on your recent order on \'Spurt Cart\'.\r\nThe status of the product {title} in the order number {order} is -  \'{status}\' \r\nYou can view the complete details of your Order status, in the \'My Order History\' section of your Customer Account at Spurt Cart. </p>',1,'2020-05-19 16:15:58','2020-05-19 16:15:58',NULL,NULL),(22,'quotation request mail','quotation request mail','Dear {name},<br/><br/> <p style=\'margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px\'> Here is a new Quotation for your product {title} from customer -{customername}. </p>',1,'2020-05-27 09:49:04','2020-05-27 09:49:04',NULL,NULL);
/*!40000 ALTER TABLE `email_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01  9:00:33
