<?php

$mem_id = $_REQUEST['memId']; //實際送來是no
$mem_name = $_REQUEST['memName'];
$mem_tel = $_REQUEST['memTel'];
$mem_addr = $_REQUEST['memAddr'];
$mem_state = $_REQUEST['memState'];
// exit();

try {
    require_once "connect.php";
    $pdo->beginTransaction();
    // $sql = "UPDATE `member` SET   mem_name = :mem_name , mem_tel = :mem_tel , mem_addr = :mem_addr ,mem_stat=:mem_state WHERE mem_id = :mem_id";

    $sql = "UPDATE `member` SET   mem_name = '$mem_name' , mem_tel = '$mem_tel' , mem_addr = '$mem_addr' ,mem_stat='$mem_state' WHERE mem_no = '$mem_id'";
    //exit($sql);
    $report = $pdo->prepare($sql);
    // $report->bindValue(":mem_id", $_REQUEST['memId']);
    // $report->bindValue(":mem_name", $_REQUEST['memName']);
    // $report->bindValue(":mem_tel", $_REQUEST['memTel']);
    // $report->bindValue(":mem_addr", $_REQUEST['memAddr']);
    // $report->bindValue(":mem_state", $_REQUEST['memState']);

    if ($report->execute()) {
        echo "更新成功";
        $pdo->commit();
    } else {
        echo "err";
    }
    ;

} catch (PDOException $e) {
    echo "更新失敗";
    $pdo->rollBack();
}
