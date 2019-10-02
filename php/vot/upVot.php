<?php
session_start();

// exit();

try {
    require_once "../connectDataBase.php";
    $sql = "INSERT INTO `wish_pool_vote`(`mem_id`, `cust_no`) VALUES (:mem_id,:cust_no)";
    $upvotFn = $pdo->prepare($sql);
    $upvotFn->bindValue(':cust_no', $_REQUEST['cust_no']);
    $upvotFn->bindValue(':mem_id', $_REQUEST['mem_id']);
    $upvotFn->execute();

    // $upvotFn = $upvotFn->fetch(PDO::FETCH_ASSOC);
    echo "ok";
} catch (PDOException $e) {
    echo "sysError";
}
