<?php
header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    $prod_no = $_REQUEST['prod_no'];

    $sql = 'SELECT `prod_img` , `prod_name` , `prod_price` FROM `official_product` WHERE ( prod_no = :prod_no )';
    $result = $pdo -> prepare($sql);
    $result -> bindValue(":prod_no",$prod_no);
    $result -> execute();

    $data = $result -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

}catch (PDOException $e){
    echo 'error';
}
?>