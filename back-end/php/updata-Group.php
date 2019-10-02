<?php
$errMsg = "";
try {
    require_once "connect.php";
    // echo $_POST['proPic'];
    // exit();

    // $sql = "INSERT INTO `official_product`(`prod_name`,`base_no`,`ingr_no_1`, `ingr_no_2`, `prod_price`,`prod_desc`,`prod_img`) VALUES (:proName,:proBase,:decoOne,:decoTwo,:proPrice,:peoInfo,:proPic)";
    // $sql = "INSERT INTO `group_shopping`(`cust_no`,`grp_stat`, `grp_cdate`, `grp_edate`, `grp_price`, ) VALUES (:custNo,:grpstat,:grpcdate,:grpedate,:grpprice)";
    //'11','進行中','2019-12-01','2019-12-01','555'

    $sql = "INSERT INTO `group_shopping`(`cust_no`, `grp_cdate`, `grp_edate`, `grp_price`) VALUES (:custNo,:grpcdate,:grpedate,:grpprice)";
    $uplistData = $pdo->prepare($sql);
    // 客制編號
    $uplistData->bindValue(':custNo', $_POST['custNo']);
    // =================================================
    // =================================================
    // 開始日期
    $uplistData->bindValue(':grpcdate', $_POST['grpcdate']);
    // =================================================
    // 結束日期
    $uplistData->bindValue(':grpedate', $_POST['grpedate']);
    // =================================================
    // 團購價格
    $uplistData->bindValue(':grpprice', $_POST['grpprice']);
    // =================================================
    // =================================================
    $uplistData->execute();

    echo "新增成功~";

} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
}
echo $errMsg;
