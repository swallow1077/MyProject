<?php 
    session_start();
    $mem_id= $_SESSION["memId"];
    // $mem_id= 'apple';
 

    // Save img original space.

    // 成功的
    require_once("connectDataBase.php");

    // Save img ------------------------
    $upload_dir = "../img/customized/";
    if( ! file_exists($upload_dir)){
      mkdir($upload_dir);
    }
    // 自動串號
    $psn = $pdo->lastInsertId();

    $imgDataStr = $_POST['hidden_data'];
    $imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr);
    $imgDataStr = str_replace(' ', '+', $imgDataStr);
    $data = base64_decode($imgDataStr);
    // $fileName = $psn . $mem_id . date("ymdHis");
    $fileName = $mem_id . date("ymdHis");
    $file = $upload_dir . $fileName . ".png";
    $success = file_put_contents($file, $data);
    file_put_contents($file, $data);

    // ---------------------------------

    $real_dir = "img/customized/";
    $realImgPath = $real_dir . $fileName . ".png";

    // $sql = "INSERT INTO `test` ( linnng, file) values(:linnng, :file)";
    // $products = $pdo->prepare( $sql );
    // $products -> bindValue(":linnng", $_POST["cust_price"]);
    // $products -> bindValue(":file", $realImgPath);
    // $products -> execute();
    echo $_POST["input_selectIngred_1"];
    echo $_POST["input_selectIngred_2"];
    echo $_POST["input_selectDecor_1"];
    echo $_POST["input_selectDecor_2"];
    echo $_POST["input_selectDecor_3"];
    $_POST["input_selectIngred_1"]= 
      $_POST["input_selectIngred_1"]=="" ? null :$_POST["input_selectIngred_1"];
    $_POST["input_selectIngred_2"] = 
      $_POST["input_selectIngred_2"]==""? null: $_POST["input_selectIngred_2"];
    $_POST["input_selectDecor_1"]=
      $_POST["input_selectDecor_1"]==""? null: $_POST["input_selectDecor_1"];
    $_POST["input_selectDecor_2"]=
      $_POST["input_selectDecor_2"]==""? null: $_POST["input_selectDecor_2"];
    $_POST["input_selectDecor_3"]=
      $_POST["input_selectDecor_3"]==""? null: $_POST["input_selectDecor_3"];
try{
    // -----------------------------------------------For special topic
    // require_once("connectDataBase.php");
    $sql = "INSERT INTO `custom_product` ( cust_name, cust_import, mem_id, base_no, ingr_no_1, ingr_no_2, deco_no_1, deco_no_2, deco_no_3, cust_price, cust_img) values( :cust_name, :cust_import, :mem_id, :base_no, :ingr_no_1, :ingr_no_2, :deco_no_1, :deco_no_2, :deco_no_3, :cust_price, :cust_img)";

    // $psn = $pdo->lastInsertId();

    $products = $pdo->prepare( $sql );
    $products -> bindValue(":cust_name", $_POST["msgTitle"]);
    $products -> bindValue(":cust_import", $_POST["msgContent"]);
    $products -> bindValue(":mem_id", $mem_id);

    $products -> bindValue(":base_no", $_POST["input_base"]);
    $products -> bindValue(":ingr_no_1", $_POST["input_selectIngred_1"]);
    $products -> bindValue(":ingr_no_2", $_POST["input_selectIngred_2"]);
    $products -> bindValue(":deco_no_1", $_POST["input_selectDecor_1"]);
    $products -> bindValue(":deco_no_2", $_POST["input_selectDecor_2"]);
    $products -> bindValue(":deco_no_3", $_POST["input_selectDecor_3"]);

    $products -> bindValue(":cust_price", $_POST["cust_price"]);
    $products -> bindValue(":cust_img", $realImgPath);
    $products -> execute();
    echo "成功";
    
}
catch(PDOException $e){
  echo $e->getMessage();
}

?>