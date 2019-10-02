<?php
try {
    require_once '../connectDataBase.php';
    $sql = "SELECT w.`cust_no`, c.`cust_name` , count(*) 'vote' FROM `wish_pool_vote` w JOIN `custom_product` c ON w.cust_no = c.cust_no GROUP BY w.cust_no ORDER BY vote DESC";
    $top = $pdo->prepare($sql);
    $top->execute();
    $topdata = $top->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($topdata);
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
