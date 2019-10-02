<?php 
session_start();

$errMsg = "";
$mem_id= $_REQUEST["memId"];
$mem_psw= $_REQUEST["memPsw"];
$mem_name= $_REQUEST["memName"];
$mem_tel= $_REQUEST["memTel"];
$mem_email= $_REQUEST["email"];


try {
	require_once("php/connectDataBase.php");
	
	$sqlupdatemem = "update member 
	set mem_psw = :mem_psw , mem_name = :mem_name , mem_tel = :mem_tel, mem_email = :mem_email
	where mem_id= :mem_id";
	$members = $pdo->prepare($sqlupdatemem);
	$members->bindValue(":mem_id", $mem_id);
	$members->bindValue(":mem_name", $mem_name);
	$members->bindValue(":mem_psw", $mem_psw);
	$members->bindValue(":mem_tel", $mem_tel);
	$members->bindValue(":mem_email", $mem_email);
	$members->execute();

	echo "新增成功~";
	header("Location: member.php");

    
	//.......確定是否上傳成功
	if($_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
		//先檢查images資料夾存不存在
		$image = "php/upload/";

        if(!file_exists($image)){
			// echo "資料夾不存在";
            mkdir($image);
        }
		
		//將檔案copy到要放的路徑
		$fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
		$fileName = $mem_id . "." . $fileInfoArr["extension"]; //1.png....

		$from = $_FILES["upFile"]["tmp_name"];//站存檔的路徑
		// print_r($from);
		$to = $image . $fileName;
		copy( $from, $to);

		//將檔案名稱寫回資料庫
		$sql = "update member set mem_img = :mem_img where mem_id=:mem_id";
		$memberImg = $pdo->prepare($sql);
		$memberImg -> bindValue(":mem_img", "php/upload/".$fileName ); //php/upload/1.png
		$memberImg -> bindValue(":mem_id", $mem_id ); //php/upload/1.png
		$memberImg -> execute();
		echo "新增成功~";

	}else{
		echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
		echo "新增失敗<br>";
		echo $errMsg = "";
	}
} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
	echo $errMsg;
}


?>    
