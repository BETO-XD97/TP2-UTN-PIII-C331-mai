CREATE DATABASE empresautn;

USE empresautn;

CREATE TABLE `empresautn`.`departamentos` (
  `idDepartamento` INT NOT NULL AUTO_INCREMENT,
  `Area` VARCHAR(25) NOT NULL,
  `Es_Remoto` TINYINT NOT NULL DEFAULT 0,
  `Director` VARCHAR(50) NOT NULL,
  `Presupuesto` DECIMAL(10,2) NOT NULL,
  `Cant_Empleados` INT NOT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
);


CREATE TABLE `empresautn`.`empleados` (
  `idEmpleado` INT NOT NULL AUTO_INCREMENT, 
  `idDepartamento` INT NULL DEFAULT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Salario` DECIMAL(10,2) NOT NULL,
  `Dias_Vacaciones` INT NOT NULL,
  `Estado` TINYINT NOT NULL DEFAULT 0,
  `Categoria` VARCHAR(15) NOT NULL,
  `createdAt` DATE NULL DEFAULT NULL,
  `updatedAt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idEmpleado`),
  -- RELACION DE 1:N EN DONDE EL 1 ES EL DEPARTAMENTO Y N POR EMPLEADOS
  FOREIGN KEY (`idDepartamento`) REFERENCES departamentos(`idDepartamento`)  
);



