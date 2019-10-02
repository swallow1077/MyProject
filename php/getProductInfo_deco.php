<?php
header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    $deco_no = $_REQUEST['deco_no'];

    $sql = 'SELECT `deco_img` , `deco_name` , `deco_price` FROM `decoration` WHERE ( deco_no = :deco_no )';
    $result = $pdo -> prepare($sql);
    $result -> bindValue(":deco_no",$deco_no);
    $result -> execute();

    $data = $result -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

}catch (PDOException $e){
    echo 'error';
}
?>