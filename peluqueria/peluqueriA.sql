CREATE DATABASE  IF NOT EXISTS `peluqueria` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `peluqueria`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: peluqueria
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cita` (
  `idcita` int(11) NOT NULL AUTO_INCREMENT,
  `fechaC` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` varchar(45) NOT NULL,
  `cliente` varchar(255) DEFAULT NULL,
  `empleado` varchar(10) NOT NULL,
  `cedulaCliente` varchar(10) DEFAULT NULL,
  `nombreCliente` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `servicio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idcita`),
  KEY `servicio_idx` (`servicio`),
  KEY `cliente_idx` (`cliente`),
  KEY `empleado_idx` (`empleado`),
  CONSTRAINT `cliente` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `empleado2` FOREIGN KEY (`empleado`) REFERENCES `empleado` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `servicio` FOREIGN KEY (`servicio`) REFERENCES `servicios` (`idservicios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (24,'2018-02-09','12:00:00','6','En espera','ederene12@gmail.com','0983456775','0987654321','milton vera',5,25),(25,'2018-01-02','12:00:00','6      ','En espera','ederene12@gmail.com','0983456775','0951198993','eder vera',5,25),(26,'2018-01-03','11:02:00','1      ','En espera','ederene12@gmail.com','0951198993','0987654321','lola',7,7),(27,'2018-03-08','11:01:00','3      ','En espera','ederene12@gmail.com','0983456775','0000000000','asdass',20,18),(28,'2018-04-04','13:03:00','4      ','En espera','ederene12@gmail.com','0983456775','0000000000','monica guzman',3.5,20),(29,'2017-05-03','13:00:00','6','En espera','ederene12@gmail.com','0951198993','0000000000','monica guzman',5,25),(30,'2018-07-12','12:05:00','6      ','En espera','ederene12@gmail.com','0987654321','11111111','nombreeee',3,26),(32,'2018-07-05','12:00:00','4      ','En espera','ederene12@gmail.com','0983456775','0987654321','dfghjk',10,21);
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `telefono` varchar(10) DEFAULT NULL,
  `cedula` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (NULL,NULL,NULL,NULL,'aldair_09@live.com'),('0960052380','000000000','eder','vera','ederene12@gmail.com'),(NULL,NULL,NULL,NULL,'mialvera@espol.edu.ec'),('0982479989','0951198993','Milton Aldair','Vera Guzman','miltonvera96@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_hab`
--

DROP TABLE IF EXISTS `emp_hab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emp_hab` (
  `idemp_hab` int(11) NOT NULL AUTO_INCREMENT,
  `empleado` varchar(10) DEFAULT NULL,
  `habilidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`idemp_hab`),
  KEY `empleado_idx` (`empleado`),
  KEY `habilidad_idx` (`habilidad`),
  CONSTRAINT `empleado` FOREIGN KEY (`empleado`) REFERENCES `empleado` (`cedula`),
  CONSTRAINT `habilidad` FOREIGN KEY (`habilidad`) REFERENCES `habilidades` (`idhabilidad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_hab`
--

LOCK TABLES `emp_hab` WRITE;
/*!40000 ALTER TABLE `emp_hab` DISABLE KEYS */;
INSERT INTO `emp_hab` VALUES (1,'0951198993',1),(2,'0951198993',2),(3,'0951198993',5),(4,'0983456775',3),(5,'0983456775',4),(6,'0983456775',6),(7,'0987654321',1),(8,'0987654321',3),(9,'0987654321',5),(10,'0987654321',6);
/*!40000 ALTER TABLE `emp_hab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `cedula` varchar(10) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(205) DEFAULT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('0951198993','Maria','Vera','0982479989','maria@gmail.com'),('0983456775','Michelle','ALvarado','0000000000','michelle@gmail.com'),('0985116576','Karla','Poveda','0000000000','karla@gmail.com'),('0987654321','Richard','Robayo','0956787993','richard@gmail.com'),('2334981290','Johanna','García ','0987654321','johanna@gmail.com');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidades`
--

DROP TABLE IF EXISTS `habilidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `habilidades` (
  `idhabilidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idhabilidad`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades`
--

LOCK TABLES `habilidades` WRITE;
/*!40000 ALTER TABLE `habilidades` DISABLE KEYS */;
INSERT INTO `habilidades` VALUES (1,'Peluquería'),(2,'Masajes'),(3,'Faciales'),(4,'Manicure'),(5,'Pedicure'),(6,'Para Hombres');
/*!40000 ALTER TABLE `habilidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idproductos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `proveedor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idproductos`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `idservicios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`idservicios`),
  KEY `descripcion_idx` (`descripcion`),
  CONSTRAINT `descripcion` FOREIGN KEY (`descripcion`) REFERENCES `habilidades` (`idhabilidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Secado Corto',1,5),(2,'Secado Medio',1,6),(3,'Secado Largo',1,7),(4,'Corte Señora',1,4.5),(5,'Corte Niña',1,4),(6,'Teñir',1,6.5),(7,'Matizado',1,7),(8,'Mechas',1,4),(9,'Reparador Corto',1,13),(10,'Permanente',1,12),(11,'Fijador',1,1),(12,'Lavar secar y corte ilimitado',1,26),(13,'Espalda mujer',2,8.5),(14,'Pierna mujer',2,8.5),(15,'Cuerpo entero mujer',2,11),(16,'Higiene Facial',3,11),(17,'Seroum Biologico',3,4.5),(18,'Hidratación profunda ',3,20),(19,'Manicura',4,4.5),(20,'Limar y Esmaltar Uñas ',4,3.5),(21,'Esmaltado Semipermanente manos',4,10),(22,'Limar y Cortar Uñas Pies',5,3.5),(23,'Pedicure Combinado',5,11),(24,'Esmaltado Semipermanente Pies',5,10),(25,'Corte Hombre',6,5),(26,'Corte Niño',6,3);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'peluqueria'
--
/*!50003 DROP PROCEDURE IF EXISTS `buscarCitas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `buscarCitas`(in tipo char(10), in anio char(4), in mes char(5), in usuario char(20))
begin

		if(tipo = 'todos') then
			if(mes ='todos') then
				SELECT c.idcita, c.fechaC, c.hora, h.nombre as descripcion, c.estado, e.nombre, e.apellido, e.cedula, c.nombreCliente, c.total, s.nombre as servicio
				 FROM cita c join habilidades h on c.descripcion = h.idhabilidad 
				 join empleado e on e.cedula = c.empleado 
				 join servicios s on c.servicio = s.idservicios
				 where c.cliente = usuario
				 and year(fechaC) = anio;
			else
				SELECT c.idcita, c.fechaC, c.hora, h.nombre as descripcion, c.estado, e.nombre, e.apellido, e.cedula, c.nombreCliente, c.total, s.nombre as servicio
				 FROM cita c join habilidades h on c.descripcion = h.idhabilidad 
				 join empleado e on e.cedula = c.empleado 
				 join servicios s on c.servicio = s.idservicios
				 where c.cliente = usuario
				 and year(fechaC) = anio
				 and month(fechaC) = mes;
			end if;
		else
			if(mes ='todos') then
				SELECT c.idcita, c.fechaC, c.hora, h.nombre as descripcion, c.estado, e.nombre, e.apellido, e.cedula, c.nombreCliente, c.total, s.nombre as servicio
				 FROM cita c join habilidades h on c.descripcion = h.idhabilidad 
				 join empleado e on e.cedula = c.empleado 
				 join servicios s on c.servicio = s.idservicios
				 where c.cliente = usuario
                 and descripcion = tipo
				 and year(fechaC) = anio;
			else
				SELECT c.idcita, c.fechaC, c.hora, h.nombre as descripcion, c.estado, e.nombre, e.apellido, e.cedula, c.nombreCliente, c.total, s.nombre as servicio
				 FROM cita c join habilidades h on c.descripcion = h.idhabilidad 
				 join empleado e on e.cedula = c.empleado 
				 join servicios s on c.servicio = s.idservicios
				 where c.cliente = usuario
                 and descripcion = tipo
				 and year(fechaC) = anio
                 and month(fechaC) = mes;
			end if;
        end if;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cargarReservas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cargarReservas`(in cliente char(255), in anio char(4), in mes char(2))
begin 
	SELECT c.idcita, c.fechaC, c.hora, h.nombre as descripcion, c.estado, e.nombre, e.apellido, e.cedula, c.nombreCliente, c.total, s.nombre as servicio
	 FROM cita c join habilidades h on c.descripcion = h.idhabilidad 
	 join empleado e on e.cedula = c.empleado 
	 join servicios s on c.servicio = s.idservicios
     where c.cliente = cliente
     and year(fechaC) = anio
     and month(fechaC) = mes;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clientesporempleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clientesporempleado`(in anio char(4))
begin 
	select empleado, count(idcita) as total
	from cita 
	where YEAR(fechaC) = anio
	group by empleado;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `empHab` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `empHab`(in empleado char(10))
begin
	select h.nombre 
	from emp_hab e join habilidades h
	on habilidad = idhabilidad
	where e.empleado = empleado; 
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `habEmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `habEmp`(in habilidad int)
begin
	select e.nombre, e.apellido, e.cedula 
	from emp_hab eh join empleado e
	on eh.empleado = e.cedula
	where eh.habilidad = habilidad; 
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ventasporanio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ventasporanio`(in anio char(4))
begin 
SELECT MONTH(c.fechaC) Mes, format(sum(c.total), 2) total
		FROM cita c
        where YEAR(c.fechaC) = anio
		GROUP BY  MONTH(c.fechaC)
		ORDER BY MONTH(c.fechaC);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-03 12:11:03
