<?php
$errMsg = "";


// $jsonStr = $_POST["dataInfo"];

$jsonStr = $_REQUEST["dataInfo"];
$dataObj = json_decode($jsonStr);
// $prod_no=$_REQUEST["prod_no"];


try{
    require_once("../connectDataBase.php");
    $sql = "INSERT INTO `message_comment` (`prod_no`,`mem_id`, `msg_cdate`,`mem_eva`,`msg_text`) 
    value(:prod_no,:mem_id,:newday,:starIndex,:comment_content)";

    $result = $pdo->prepare( $sql );
    $result -> bindValue(":prod_no",$dataObj->prod_no);
    $result -> bindValue(':mem_id',$dataObj->mem_id );
    $result -> bindValue(':newday',$dataObj->msgDate);
    $result -> bindValue(':starIndex',$dataObj->mem_eva);
    $result -> bindValue(':comment_content', $dataObj->comment_content);
    $result -> execute();
        
        
        // echo "新增成功";
        echo $jsonStr;


}catch (PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
    echo $errMsg;
}

?>