<?php

try {
    require_once "connect.php";
    $sql = "select * from employee where emp_id = :admin_id and emp_psw = :admin_psw";
    $administrator = $pdo->prepare($sql);
    $administrator->bindValue(':admin_id', $_REQUEST['admin_id']);
    $administrator->bindValue(':admin_psw', $_REQUEST['admin_psw']);
    $administrator->execute();

    $administratorRow = $administrator->fetch(PDO::FETCH_ASSOC);
    if (count($administratorRow) > 0) {
        echo $administratorRow["emp_id"];
    } else {
        echo "login_error";
    }

} catch (PDOException $e) {
    echo "sysError";
}
