<?php

  $base_no= isset($_REQUEST["base_no"])===true ? $_REQUEST["base_no"] :"";
  
  $ingr_no= isset($_REQUEST['ingr_no'])===true ? $_REQUEST['ingr_no'] :"";
  $prodSelectOpt= isset($_REQUEST['prod_price'])===true ? $_REQUEST['prod_price'] :"";
  
try{
  require_once("../connectDataBase.php");
  //每種派預設有一種基底,勾兩種出現的是A || B,三種則全選,
  //選項全都沒勾也是出現全部產品

 
  // //先將原先在JS用_隔開的兩個值用','取代( ex.1_3-->"1','3")
  // $base_no1=str_replace("-","'and'",$base_no);


  //丟進來的base_no變數，如果是兩個值以上，用 'and base_no'=取代--> select * from xxx where base_no='1' and base_no='2'
  $base_no_1=json_encode($base_no);
  $base_no_2=str_replace("-","' and base_no= '",$base_no_1);
  $base_no_3=json_decode($base_no_2);




  $ingr_no_1=json_encode($ingr_no);
 
  //丟進來的ingr_no變數，如果是兩個值(ingr_no_1&ingr_no_2)以上，用 ' and ingr_no_2= '取代--> select * from xxx where ingr_no_1='1' and ingr_no_2='2'
  $ingr_no_2=str_replace("-","' and ingr_no_2= '",$ingr_no_1);
  $ingr_no_3=json_decode($ingr_no_2);

  
  // var_dump($ingr_no_3);

  //基底與配料的變化:(1,0)-->1基底0配料  (0,2)-->0基底2配料
  if(strlen($base_no)===1&&strlen($ingr_no)===0){    //(1,0)
    $sql="select * from official_product where base_no ='{$base_no}'order by prod_price desc";
  }else if(strlen($base_no)>=3&&strlen($ingr_no)===0){ //(2,0)
    $sql="select * from official_product where base_no=0 order by prod_price desc";
  }else if(strlen($base_no)===1&&strlen($ingr_no)===1){//(1,1)  select * from official_product where base_no ='1' and (ingr_no_1='2' or ingr_no_2='2');
    $sql="select * from official_product where base_no ='{$base_no}' and (ingr_no_1='{$ingr_no_3}' or ingr_no_2='{$ingr_no_3}')order by prod_price desc";
  }else if(strlen($base_no)>=2&&strlen($ingr_no)===1){ //(2,1)
    $sql="select * from official_product where base_no =0 and ingr_no_1='{$ingr_no}'order by prod_price desc";
  }else if(strlen($base_no)===0&&strlen($ingr_no)===1){ //(0,1)
    $sql="select * from official_product where ingr_no_1='{$ingr_no}' or ingr_no_2='{$ingr_no}'order by prod_price desc";
  }else if(strlen($base_no)===1&&strlen($ingr_no)>=3){  //(1,2)  
    $sql="select * from official_product where base_no='{$base_no_3}'and (ingr_no_1='{$ingr_no_3}')order by prod_price desc";
  }else if(strlen($base_no)>=3&&strlen($ingr_no)>=3){  //(2,2)
    $sql="select * from official_product where base_no='{$base_no_3}'and ingr_no_1='{$ingr_no_3}'order by prod_price desc";
  }else if(strlen($base_no)===0&&strlen($ingr_no_3)>=3){ //(0,2)
    $sql="select * from official_product where ingr_no_1='{$ingr_no_3}'order by prod_price desc";
  }else if(strlen($base_no_3)===0&&strlen($ingr_no_3)===0&&$prodSelectOpt==="price"){ //(0,0)
    $sql="select * from official_product order by prod_price desc";
  }else if(strlen($base_no_3)===0&&strlen($ingr_no_3)===0&&$prodSelectOpt!=="price"){
    $sql="select * from official_product order by prod_price desc";
  }

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

