<?php
header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    $mem_id = $_REQUEST['mem_id'];
    $prod_no = $_REQUEST['prod_no'];

    $sql = 'SELECT `prod_no` FROM `collect_list` WHERE ( mem_id = :mem_id and prod_no = :prod_no )';
    $result = $pdo -> prepare($sql);
    $result -> bindValue(":mem_id",$mem_id);
    $result -> bindValue(":prod_no",$prod_no);
    $result -> execute();

    $data = $result -> fetchAll(PDO::FETCH_ASSOC);
    if(count($data) == 0)
    {
        $sql = 'INSERT INTO `collect_list` ( mem_id , prod_no ) VALUE ( :mem_id , :prod_no )';
        $result = $pdo -> prepare($sql);
        $result -> bindValue(":mem_id",$mem_id);
        $result -> bindValue(":prod_no",$prod_no);
        $result -> execute();

        echo 'true';
    }
    else
    {
        $sql = 'DELETE FROM collect_list WHERE ( mem_id = :mem_id and prod_no = :prod_no )';
        $result = $pdo -> prepare($sql);
        $result -> bindValue(":mem_id",$mem_id);
        $result -> bindValue(":prod_no",$prod_no);
        $result -> execute();

        echo 'false';
    }

}catch (PDOException $e){
    echo 'error';
}
?>