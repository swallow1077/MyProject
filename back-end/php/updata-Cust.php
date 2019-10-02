<?php
$errMsg = "";
try {
    require_once "connect.php";
    // echo $_POST['proPic'];
    // exit();

    if ($_FILES["proPic"]["error"] == UPLOAD_ERR_OK) {
        // $sql = "INSERT INTO `official_product`(`prod_name`,`base_no`,`ingr_no_1`, `ingr_no_2`, `prod_price`,`prod_desc`,`prod_img`) VALUES (:proName,:proBase,:decoOne,:decoTwo,:proPrice,:peoInfo,:proPic)";
        $sql = "INSERT INTO `official_product`(`prod_name`, `base_no`, `ingr_no_1`, `ingr_no_2`, `deco_no_1`, `deco_no_2`, `prod_stat`, `prod_price`, `prod_desc`, `prod_img`, `prod_eva`, `prod_eva_count`) VALUES (:proName,:proBase,:ingrOne,:ingrTwo,:decoOne,:decoTwo,:prodStat,:proPrice,:proDesc,:proPic,:porEva,:porEvacount)";

        $uplistData = $pdo->prepare($sql);
        // 商品名稱
        $uplistData->bindValue(':proName', $_POST['proName']);
        // =================================================
        // 商品價格
        $uplistData->bindValue(':proPrice', $_POST['proPrice']);
        // =================================================
        // 商品說明
        $uplistData->bindValue(':proDesc', $_POST['proDesc']);
        // =================================================
        // 基底
        $uplistData->bindValue(':proBase', $_POST['proBase']);
        // =================================================
        // 配料1
        $uplistData->bindValue(':ingrOne', $_POST['ingrOne']);
        // =================================================
        // 配料2
        $uplistData->bindValue(':ingrTwo', $_POST['ingrTwo']);
        // =================================================
        // 裝飾品1
        $uplistData->bindValue(':decoOne', $_POST['decoOne']);
        // =================================================
        // 裝飾品2
        $uplistData->bindValue(':decoTwo', $_POST['decoTwo']);
        // =================================================
        // 狀態
        $uplistData->bindValue(':prodStat', $_POST['prodStat']);
        // =================================================
        // 商品圖片
        $uplistData->bindValue(':proPic', $_FILES["proPic"]["name"]);
        // 評價
        $uplistData->bindValue(':porEva', $_POST['porEva']);
        // =================================================
        // 次數
        $uplistData->bindValue(':porEvacount', $_POST['porEvacount']);
        // =================================================
        $uplistData->execute();

        //取得自動創號的key值
        $psn = $pdo->lastInsertId();

        //先檢查images資料夾存不存在
        if (file_exists("img") === false) {
            mkdir("img");
        }
        //將檔案copy到要放的路徑
        $fileInfoArr = pathinfo($_FILES["proPic"]["name"]);
        $fileName = "{$psn}.{$fileInfoArr["extension"]}"; //8.gif

        $from = $_FILES["proPic"]["tmp_name"];
        $to = "img/$fileName";
        //改這邊路徑位置
        copy($from, $to);

        //將檔案名稱寫回資料庫
        $sql = "update official_product set prod_img = :proPic where prod_no = $psn";
        $products = $pdo->prepare($sql);
        $products->bindValue(":proPic", $to);
        $products->execute();
        echo "新增成功~";

    } else {
        echo "錯誤代碼 : {$_FILES["proPic"]["error"]} <br>";
        echo "新增失敗<br>";
    }
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
}
echo $errMsg;
