<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd102g2;charset=utf8";
$user = "root";
$password = "1111";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
$pdo = new PDO($dsn, $user, $password, $options);
