<?php
try{
    //連線
    require_once('prod_in/connectDataBase.php');
    
    $sql = "select * from member where mem_id=:memId and mem_psw=:memPsw";
    $member = $pdo->prepare($sql);
    // exit($_GET["memId"]. $_GET["memPsw"]);
    $member->bindValue(":memId", $_REQUEST["memId"]);
    $member->bindValue(":memPsw", $_REQUEST["memPsw"]);
    $member->execute();
    if( $member->rowCount() == 0){ //查無此人
        echo "loginError";
    }else{
        $memRow = $member->fetch(PDO::FETCH_ASSOC);
    //登入成功,將登入者的資料寫入sessions
    $_SESSION["memId"] = $memRow["mem_id"];
    $_SESSION["memName"] = $memRow["mem_name"];
    $_SESSION["mumTel"] = $memRow["mem_tel"];
    $_SESSION["memNo"] = $memRow["mem_no"];
        echo $memRow["mem_name"];
    }
    // $sql = "select * from member";
    // $member = $pdo->query($sql);
    // $memRows = $member -> fetch(PDO::FETCH_ASSOC);
    // foreach( $memRows as $i => $memRow){
    //     echo $memRow["mem_id"];
    // }
    // $_SESSION["memId"] = $memRows["mem_id"];
    // $_SESSION["memName"] = $memRows["mem_name"];
    // $_SESSION["mumTel"] = $memRows["mem_tel"];
    // $_SESSION["memNo"] = $memRows["mem_no"];

    

}catch (PDOException $e){
    echo $e->getMessage();
}
?>