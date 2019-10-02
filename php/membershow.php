<?php 
$errMsg = "";
try {
	$dsn = "mysql:host=localhost;port=3306;dbname=sql_database;charset=utf8";
	$user = "root";
	$password = "1111";
	$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);

	$sql = "select * from member";
	$products = $pdo->query($sql);
	//回傳欄位的key的arr
	$memRows = $products -> fetchAll(PDO::FETCH_ASSOC);
	// print_r($prodRows[0]);
	// exit();

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>    
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Examples</title>
</head>
<body>
<?php
if( $errMsg != ""){ //有例外
  echo "<center>$errMsg</center>";
}else{

?>	
<table id="prodList"  align='center' width="800">	
	<tr><th>編號</th>
	<th>帳號</th>
	<th>密碼</th>
	<th>姓名</th>
	<th>電話</th>
	<th>地址</th></tr>
<?php 
    foreach( $memRows as $i => $memRow){
?>		
		<tr>
		<td><?=$memRow["mem_no"]?></td>
		<td><?=$memRow["mem_id"]?></td>
		<td><?=$memRow["mem_psw"]?></td>
		<td><?=$memRow["mem_name"]?></td>
		<td><?=$memRow["mem_tel"]?></td>
		<td><?=$memRow["mem_addr"]?></td>		
		</tr>
<?php
	} //for
}//if
?>
</table>
</body>
</html>