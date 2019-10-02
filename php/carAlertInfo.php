<?php
$errMsg = "";
try{
  require_once("connectDataBase.php");
  $sql = "SELECT `prod_name`,`base_name`,`ingr_name`,`prod_price`,`prod_desc`,`prod_img`,`prod_eva`
  FROM official_product a 
  LEFT JOIN base b ON a.`base_no`=b.`base_no` 
  LEFT JOIN ingredients i ON a.`ingr_no_1`=i.`ingr_no` 
  where prod_no = 59";
  $member = $pdo->prepare($sql);
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

