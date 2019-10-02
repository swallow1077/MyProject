<?php
header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    $mem_id = $_POST['mem_id'];

    $sql = 'SELECT `prod_no` FROM `collect_list` WHERE ( mem_id = :mem_id )';
    $result = $pdo -> prepare($sql);
    $result -> bindValue(":mem_id",$mem_id);
    $result -> execute();

    $data = $result -> fetchAll(PDO::FETCH_ASSOC);
    if(count($data) < 1)
    {
        echo "false";
    }
    else
    {
        echo json_encode($data);
    }

}catch (PDOException $e){
    echo 'error';
}
?>