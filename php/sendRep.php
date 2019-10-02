<?php
session_start();
$errMsg = "";
$mem_id= $_POST["memId"];
// $mem_id = "apple";
$msg_no = $_REQUEST['msg_no'];

try{
    require_once("connectDataBase.php");
    $sql = "SELECT * FROM comment_report where (mem_id = :mem_id and msg_no = :msg_no)";
    $report = $pdo->prepare($sql);
    $report -> bindValue(":mem_id", $mem_id);
    $report -> bindValue(":msg_no",$msg_no);
    $report -> execute();

    $result = $report -> fetchAll(PDO::FETCH_ASSOC);

    if(count($result) == 0)
    {
        $sql = "INSERT INTO `comment_report` ( mem_id , msg_no ) VALUE ( :mem_id , :msg_no )";
        $report = $pdo->prepare($sql);
        $report -> bindValue(":mem_id", $mem_id);
        $report -> bindValue(":msg_no",$msg_no);
        $report -> execute();

        echo "success";
    }
    else{
        echo "無法重複檢舉";
    }

}catch(PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
    echo $errMsg;
}
?>