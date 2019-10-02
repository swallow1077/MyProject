<?php


$jsonStr = $_REQUEST["dataInfo"];
$dataObj = json_decode($jsonStr);

try{
    require_once("../connectDataBase.php");
    $sql = "INSERT INTO `message_comment` (`prod_no`,`mem_id`, `msg_cdate`,`mem_eva`,`msg_text`) 
    value(1,:msg_name,:newday,:starIndex,:comment_content)";

		$result = $pdo->prepare( $sql );
        $result -> bindValue(':msg_name',$dataObj->msg_name );
        $result -> bindValue(':newday',$dataObj->msgDate);
        $result -> bindValue(':starIndex',$dataObj->mem_eva);

        $result -> bindValue(':comment_content', $dataObj->comment_content);
        $result -> execute();
        
        
        // echo "新增成功";
        echo $jsonStr;

		// 取得自動創號的key值
		// $msg_no = $pdo->lastInsertId();

}catch (PDOException $e){
    echo $e->getMessage();
}

?>