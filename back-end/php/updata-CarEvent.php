<?php
$errMsg = "";
try {
    require_once "connect.php";
    // echo $_POST['proPic'];
    // exit();

    // $sql = "INSERT INTO `official_product`(`prod_name`,`base_no`,`ingr_no_1`, `ingr_no_2`, `prod_price`,`prod_desc`,`prod_img`) VALUES (:proName,:proBase,:decoOne,:decoTwo,:proPrice,:peoInfo,:proPic)";
    $sql = "INSERT INTO `car_event`(`car_eventName`, `event_cdate`, `event_edate`, `event_text`, `event_exactLocation`, `event_tel`) VALUES (:carName,:carCdate,:carEdate,:carTxt,:carLoc,:carTel)";

    $uplistData = $pdo->prepare($sql);
    // 活動名稱
    $uplistData->bindValue(':carName', $_POST['careventName']);
    // =================================================
    // 開始日期
    $uplistData->bindValue(':carCdate', $_POST['eventCdate']);
    // =================================================
    // 結束日期
    $uplistData->bindValue(':carEdate', $_POST['eventEdate']);
    // =================================================
    // 活動內容
    $uplistData->bindValue(':carTxt', $_POST['eventText']);
    // =================================================
    // 開始地點
    $uplistData->bindValue(':carLoc', $_POST['eventexactLocation']);
    // =================================================
    // 場地電話聯絡
    $uplistData->bindValue(':carTel', $_POST['eventTel']);
    // =================================================
    // =================================================
    $uplistData->execute();

    echo "新增成功~";

} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
}
echo $errMsg;
