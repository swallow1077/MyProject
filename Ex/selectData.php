<?php
try{
    require_once('connectDataBase.php');

    $keyWord = $_REQUEST['keyWord'];
    $dataTable = $_REQUEST['dataTable'];
    $condition = $_REQUEST['condition'];

    $sql = "select * from ".$dataTable." where ".$condition." = :keyWord";

    $result = $pdo -> prepare($sql);
    $result -> bindValue(":keyWord" , $keyWord);
    $result -> execute();
    $data = $result -> fetch(PDO::FETCH_ASSOC);
    if(count($data) < 1)
    {
        echo "查無資料";
    }
    else
    {
        echo json_encode( $data );
    }
}catch (PDOException $e){
    echo "執行失敗，請檢查資料輸入是否正確。";
}
?>