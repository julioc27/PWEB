-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-06-2023 a las 02:43:36
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_fisicos`
--

DROP TABLE IF EXISTS `datos_fisicos`;
CREATE TABLE IF NOT EXISTS `datos_fisicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_entrenamiento` int NOT NULL,
  `ejercicio1` int NOT NULL,
  `ejercicio2` int NOT NULL,
  `ejercicio3` int NOT NULL,
  `ejercicio4` int DEFAULT NULL,
  `ejercicio5` int DEFAULT NULL,
  `ejercicio6` int DEFAULT NULL,
  `ejercicio7` int DEFAULT NULL,
  `ejercicio8` int DEFAULT NULL,
  `ejercicio9` int DEFAULT NULL,
  `ejercicio10` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_entrenamiento` (`id_entrenamiento`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

DROP TABLE IF EXISTS `ejercicios`;
CREATE TABLE IF NOT EXISTS `ejercicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `foto` varchar(200) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamiento_diario`
--

DROP TABLE IF EXISTS `entrenamiento_diario`;
CREATE TABLE IF NOT EXISTS `entrenamiento_diario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `ejercicio1` varchar(50) NOT NULL,
  `ejercicio2` varchar(50) NOT NULL,
  `ejercicio3` varchar(50) NOT NULL,
  `ejercicio4` varchar(50) DEFAULT NULL,
  `ejercicio5` varchar(50) DEFAULT NULL,
  `ejercicio6` varchar(50) DEFAULT NULL,
  `ejercicio7` varchar(50) DEFAULT NULL,
  `ejercicio8` varchar(50) DEFAULT NULL,
  `ejercicio9` varchar(50) DEFAULT NULL,
  `ejercicio10` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `IDgrupo` int NOT NULL AUTO_INCREMENT,
  `NombreGrupo` int NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `ID` int NOT NULL,
  PRIMARY KEY (`IDgrupo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_usuario`
--

DROP TABLE IF EXISTS `grupo_usuario`;
CREATE TABLE IF NOT EXISTS `grupo_usuario` (
  `GrupoIDgrupo` int NOT NULL,
  `UsuarioIDusuario` int NOT NULL,
  PRIMARY KEY (`GrupoIDgrupo`,`UsuarioIDusuario`),
  KEY `FKGrupo_Usua19385` (`UsuarioIDusuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina2`
--

DROP TABLE IF EXISTS `rutina2`;
CREATE TABLE IF NOT EXISTS `rutina2` (
  `IDrutina` int NOT NULL,
  `Ejercicios` varchar(255) DEFAULT NULL,
  `Tandas` int DEFAULT NULL,
  `CantidadRepticiones` int DEFAULT NULL,
  `ID` int NOT NULL,
  PRIMARY KEY (`IDrutina`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `IDusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Edad` int NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Sexo` varchar(255) DEFAULT NULL,
  `Rol` varchar(255) NOT NULL,
  `TipoCuenta` int NOT NULL,
  `Facultad` varchar(255) DEFAULT NULL,
  `Deporte` varchar(255) DEFAULT NULL,
  `Principal` varchar(255) NOT NULL,
  `Discriminator` varchar(255) NOT NULL,
  `ID` int NOT NULL,
  PRIMARY KEY (`IDusuario`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IDusuario`, `nombre`, `apellidos`, `usuario`, `correo`, `Fecha_Inicio`, `Edad`, `Fecha_Nacimiento`, `contrasena`, `Sexo`, `Rol`, `TipoCuenta`, `Facultad`, `Deporte`, `Principal`, `Discriminator`, `ID`) VALUES
(1, 'Julio', 'Cesar', 'juliocaf', 'juliocaf@uci.cu', '0000-00-00', 0, NULL, '$2b$12$XAl5zO8UXuzq5iZEcmFXyed6Fc7eeoxEdd2eCZ.UUdflE7fxcOKCq', NULL, '', 0, NULL, NULL, '', '', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
