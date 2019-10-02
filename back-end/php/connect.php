<?php

// @session_start();
// $db_host = "localhost";
// $db_username = "root";
// $db_password = "1111";
// $db_name = "dd102g2";

// //連線資料庫
// $_SESSION['link'] = @new mysqli($db_host, $db_username, $db_password, $db_name);
// //錯誤處理
// if ($_SESSION['link']->connect_error != "") {
//     echo "資料庫連結失敗！";
// } else {
//     //設定字元集與編碼
//     //echo "資料庫連結線成功";
//     $_SESSION['link']->query("SET NAMES 'utf8'");
// }

$dsn = "mysql:host=localhost;port=3306;dbname=dd102g2;charset=utf8";
$user = "root";
$password = "1111";
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
$pdo = new PDO($dsn, $user, $password, $options);
