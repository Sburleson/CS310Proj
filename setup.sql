-- MySQL Script generated by MySQL Workbench
-- Thu Oct 19 19:47:25 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

CREATE TABLE IF NOT EXISTS `Res Halls` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(100) NULL,
  `Capacity` VARCHAR(100) NULL,
  PRIMARY KEY (`ID`))

drop table if exists `Groups`;
CREATE TABLE IF NOT EXISTS `Groups` (
  `ID` INT PRIMARY KEY AUTO_INCREMENT,
  `AverageCredits` INT NULL,
  `StudentIDs` VARCHAR(100) NULL,
  `RoomID` VARCHAR(100) NULL);
  


CREATE TABLE IF NOT EXISTS `Students` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(100) NULL,
  `Credits` VARCHAR(100) NULL,
  `GPA` VARCHAR(100) NULL,
  `RoomID` INT NULL,
  'Password' VARCHAR(100) NOT NULL,
  PRIMARY KEY (`ID`));



drop table if exists `ResHallX`;
CREATE TABLE IF NOT EXISTS `ResHallX` (
  `RoomID` VARCHAR(100) NOT NULL,
  `OccupiedBy` VARCHAR(100) NULL,
  PRIMARY KEY (`RoomID`));



CREATE TABLE IF NOT EXISTS `Queues2` (
  `ID` INT NOT NULL,
  `ResHall` VARCHAR(100) NULL,
  `GroupID` VARCHAR(100) NULL,
  `AverageCredits` INT NULL,
  PRIMARY KEY (`ID`));

-- new queue stuff
CREATE TABLE IF NOT EXISTS `DormsQ`(
`GroupID` INT NOT NULL,
`ResHall` VARCHAR(100) NOT NULL,
`QID` INT NOT NULL,
PRIMARY KEY (`QID`);
)

CREATE TABLE IF NOT EXISTS `ILUQ`(
`GroupID` INT NOT NULL,
`ResHall` VARCHAR(100) NOT NULL,
`QID` INT NOT NULL,
PRIMARY KEY (`QID`);
)

CREATE TABLE IF NOT EXISTS `Off_CampusQ`(
`GroupID` INT NOT NULL,
`QID` INT NOT NULL,
PRIMARY KEY (`QID`);
)




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;