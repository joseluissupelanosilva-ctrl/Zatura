-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2025 a las 16:42:04
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `USUARIO` varchar(255) DEFAULT NULL,
  `CORREO` varchar(255) DEFAULT NULL,
  `CONTRASEÑA` varchar(255) DEFAULT NULL,
  `id` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`USUARIO`, `CORREO`, `CONTRASEÑA`, `id`) VALUES
('daniel', 'daniel@gmail', '$2y$10$0/sGjIyyHvXjr//FmMNZKeRCsR81NC7ASjLTeijm5tfEGskeSPQOu', NULL),
('daniel', 'daniel@gmail', '$2y$10$ejlMBJsgJ3CuC50izxSRguuZ5SnrcrnkIcpkEEL8cRBQLYMZRvx56', NULL),
('jode', 'joder@gsmil.com', '$2y$10$iHwOg.5howMM3HSN/DgcXOc1x9TQBNCicubIQhif9VdTivuUSh44G', NULL),
('Juan José Ortega', 'Juan@gmail.com', '$2y$10$Z6QiTmCEGXS.v.XVyZo8IOXdSFHQcv4aGeS0v6OxYH5n.mFliLfmq', NULL),
('Daniel', 'Juan@gmail.com', '$2y$10$e7p7c226j0Z24/n3OBC6nu.h/gbhdSLZgIg8Uuswl3CAqHx3RAejG', NULL),
('DANIEL', 'joder@gsmil.com', '$2y$10$.8sfoWdVqdkQ0H/.wLZnY.y3.LsZ7Qe/fsI/XXAfZgaDnGARbby96', NULL),
('DANIEL1', 'jode@gsmil.com', '$2y$10$dyB/BcBifG4CQGAo3Y4bpu/zzzvz//FtRTdlt3zBZf3vZ1XdHwfo2', NULL),
('CAMILO', 'camilo@gmail.com', '$2y$10$5oYzIctP7uc.THEI/q0QIOdDB.Bvry.6P/8OBpxaWIFF.jNvC38SO', NULL),
('Milo', 'milo@gmail.com', '$2y$10$by2s4rp00iFzz6sWxTUcyOARPRDw3TzvIYykMiL4E.etqZDdR7eMu', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
