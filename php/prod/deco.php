<?php

  $deco_no= isset($_REQUEST["deco_no"])===true ? $_REQUEST["deco_no"] :"";
  
try{
  require_once("../connectDataBase.php");
  
    $sql="SELECT * FROM decoration";
  

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

