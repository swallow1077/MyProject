<?php
$errMsg = "";

// $Str = $_REQUEST["memId2"];
// $dataObj = json_decode($jsonStr);
// $prod_no=$_REQUEST["prod_no"];


try{
    require_once("../connectDataBase.php");
    $sql = "select * from `member` where mem_id=:memId";

    $result = $pdo->prepare($sql);
    $result -> bindValue(":memId", $_REQUEST["memId2"]);
    $result -> execute();

    if( $result->rowCount() == 0){ //查無此人
        echo "帳號可使用";
    }else{
        echo "帳號重複囉";
    }


}catch (PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
    echo $errMsg;
}

?>