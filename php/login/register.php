<?php
$errMsg = "";


$jsonStr = $_REQUEST["dataInfo"];
$dataObj = json_decode($jsonStr);
// $prod_no=$_REQUEST["prod_no"];


try{
    require_once("../connectDataBase.php");
    //----------------------
    // $sql2 = "select mem_id from member where mem_id = :memId";
    //------------------------
    $sql = "INSERT INTO `member` (`mem_id`, `mem_psw`,`mem_name`,`mem_email`,`mem_point`) 
    value(:mem_id,:mem_psw,:mem_name,:mem_email,30000)";

    $result = $pdo->prepare( $sql );
    $result -> bindValue(":mem_id",$dataObj->mem_id);
    $result -> bindValue(':mem_psw',$dataObj->mem_psw );
    $result -> bindValue(':mem_name',$dataObj->mem_name);
    $result -> bindValue(':mem_email',$dataObj->mem_email);

    $result -> execute();
        
    // echo "新增成功";
    // echo $jsonStr;

}catch (PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
    echo $errMsg;
}

?>