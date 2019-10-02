<?php
try{
    require_once('connectDataBase.php');

    $dataTable = $_REQUEST['dataTable'];
    $fieldArray = [];
    $dataArray = [];

    foreach ( $_REQUEST as $name => $data )
    {
        if($name != 'dataTable')
        {
            $fieldArray[] = $name;
            $dataArray[] = $data;
        }
    }

    try{
        $sql = "insert into ".$dataTable." (`";
        foreach ( $fieldArray as $i => $data)
        {
            $sql.=$data;
            if($i < count($fieldArray) - 1)
            $sql.="`,`";
            else $sql.="`";
        }
        $sql.=") value ('";
        foreach ( $dataArray as $i => $data )
        {
            $sql.=$data;
            if($i < count($dataArray) - 1)
            $sql.="','";
            else $sql.="'";
        }
        $sql.=")";

        $result = $pdo -> prepare($sql);
        // exit($sql);
        $result -> execute();

        echo "新增成功";

    }catch (PDOException $e){
        // echo $e;
        echo "新增失敗，欄位數量與傳入資料數量不一致或帳號重複";
    }

}catch (PDOException $e){
    echo "表格名稱錯誤";
}
?>