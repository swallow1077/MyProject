<?php
// header('Content-type: text/html; charset=UTF-8');
try{

    
    require_once('connectDataBase.php');

    ignore_user_abort();//關閉瀏覽器仍然執行
    set_time_limit(0);//讓程式一直執行下去
    $interval=3;//每隔一定時間執行
    do{
        $sql = 'select prod_no , round(avg(mem_eva),2) "data_avg" , count(*) "data_vote" FROM message_comment GROUP BY prod_no';
        // $sql = 'select * from message_comment';
        $result = $pdo -> prepare($sql);
        $result -> execute();
        $data = $result -> fetchAll(PDO::FETCH_ASSOC);
        foreach( $data as $key => $metaData )
        {
            $sql = "UPDATE official_product SET prod_eva = :data_avg , prod_eva_count = :data_count WHERE prod_no = :prod_no";
    
            $result = $pdo -> prepare($sql);
            $result -> bindValue(":data_avg",$metaData['data_avg']);
            $result -> bindValue(":data_count",$metaData['data_vote']);
            $result -> bindValue(":prod_no",$metaData['prod_no']);
            $result -> execute();
        }

        $msg = date("Y-m-d H:i:s");
        file_put_contents("log.txt",$msg,FILE_APPEND);//記錄日誌
        sleep($interval);//等待時間，進行下一次操作。
    }while(false);
    // echo "success";

}catch (PDOException $e){
    echo $e;
}
?>