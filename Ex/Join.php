<?php

try{
    require_once('connectDataBase.php');

    $keyWord = $_REQUEST['keyWord'];
    $dataTable = $_REQUEST['dataTable'];
    $condition = $_REQUEST['condition'];

    //official_product 以[一般商品](可替換為自己想要的表格 )為主表格
    //left join message_comment 並加入[留言評價表格的資料](可替換為自己想要的表格)
    //on official_product.prod_no = message_comment.prod_no 以兩個表格的[商品編號](可替換)合併資料
    //where prod_no = :keyWord prod_no( 查詢商品編號為 keyWord 的商品 )
    $sql = "select * from official_product left join message_comment on official_product.prod_no = message_comment.prod_no where prod_no = :keyWord";

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