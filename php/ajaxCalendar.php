<?php
$errMsg = "";
try{
  require_once("connectDataBase.php");
  $sql = "select * from car_event where event_cdate<=:date and event_edate>=:date";
  $member = $pdo->prepare($sql);
  $member->bindValue(":date", $_REQUEST["checkEvent"]);
  $member->execute(); 

    if( $member->rowCount()== 0){ 
        echo "222";
    }else{ //找得到
        //取回一筆資料
        while($memRow = $member->fetch(PDO::FETCH_ASSOC)){
            $array[]= $memRow;
        }
        
        //送出json字串
        echo json_encode( $array );
    }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>