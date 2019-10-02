<?php
try {
    require_once 'connect.php';
    $sql = "select * from official_product ORDER BY prod_no DESC";
    $total = $pdo->prepare($sql);
    $total->execute();
    $data = $total->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
