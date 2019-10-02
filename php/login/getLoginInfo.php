<?php 
session_start();
if( isset($_SESSION["memId"]) ){ //已登入
	echo $_SESSION["memName"]; //..........More
}else{
	echo "notLogin";
}
?>
