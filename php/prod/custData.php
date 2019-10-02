<?php

  $base_no= isset($_REQUEST["base_no"])===true ? $_REQUEST["base_no"] :"";
  
try{
  require_once("../connectDataBase.php");
  
    $sql="select * from custom_product";
  

  // echo $sql;

  $products=$pdo->prepare($sql);
 
  $products->execute();
  if($products->rowCount()==0){
    echo "{}";
  }else{
    $prodRow=$products->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($prodRow);
  }
}catch(PDOException $e){
  $errMsg="錯誤原因:".$e->getMessage()."<br>"."錯誤行號:".$e->getLine()."<br>";
  echo $errMsg;

}
?>

