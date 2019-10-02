<?php
try {
    require_once 'connectDataBase.php';
    $sql = "SELECT w.`cust_no`, c.`cust_name` , count(*) 'vote' FROM  `custom_product` c JOIN `wish_pool_vote` w ON w.cust_no = c.cust_no GROUP BY w.cust_no";

    $total = $pdo->prepare($sql);
    $total->execute();
    $data = $total->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}
