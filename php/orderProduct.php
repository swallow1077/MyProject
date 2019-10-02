<?php

// header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    if(isset($_REQUEST['P_List'])) 
    {
        $P_List = $_REQUEST['P_List'];
        $P_Info = $_REQUEST['P_Info'];
    }
    if(isset($_REQUEST['G_List'])) 
    {
        $G_List = $_REQUEST['G_List'];
        $G_Info = $_REQUEST['G_Info'];
    }
    if(isset($_REQUEST['D_List'])) 
    {
        $D_List = $_REQUEST['D_List'];
        $D_Info = $_REQUEST['D_Info'];
    }
    if(isset($_REQUEST['mem_id'])) $member = $_REQUEST['mem_id'];
    else exit("資料錯誤");
    if(isset($_POST['subTotal'])) $subTotal = $_POST['subTotal'];
    else exit("訂單錯誤，請重新操作");
    $recipient = $_REQUEST['recipient'];
    $recipient = explode('|',$recipient);

    $today = date("Y-m-d");

    $sql = 'SELECT `mem_point` FROM `member` WHERE mem_id = :mem_id';
    $point = $pdo -> prepare($sql);
    $point -> bindValue(":mem_id",$member);
    $point -> execute();
    
    $result = $point -> fetch(PDO::FETCH_ASSOC);

    if( $result['mem_point'] - $subTotal < 0) 
    {
        exit("點數不足");
    }
    else
    {
        $point = $result['mem_point'] - $subTotal;
        $sql = 'update member set mem_point = :mem_point where mem_id = :mem_id';
        $sql = $pdo -> prepare($sql);
        $sql -> bindValue(":mem_id",$member);
        $sql -> bindValue(":mem_point",$point);
        $sql -> execute();
    }

    if(isset($_REQUEST['P_List']) || isset($_REQUEST['D_List']))
    {
        $sql = 'insert into official_order ( mem_id , offi_order_cdate , reci_name , reci_tel , reci_addr ) value ( :mem_id , :offi_order_cdate , :reci_name , :reci_tel , :reci_addr )';
        
        $result = $pdo -> prepare($sql);
        $result -> bindValue(":mem_id",$member);
        $result -> bindValue(":offi_order_cdate",$today);
        $result -> bindValue(":reci_name",$recipient[0]);
        $result -> bindValue(":reci_tel",$recipient[1]);
        $result -> bindValue(":reci_addr",$recipient[2]);
        $result = $result -> execute();

        $order = $pdo->lastInsertId();
    }

    if(isset($_REQUEST['P_List']))
    {
        $sql = 'insert into official_order_list ( offi_order_no , prod_no , order_num ) value ( :order , :no , :num )';
        $result = $pdo -> prepare($sql);
        $P_List = explode(',',$P_List);
        $P_Info = json_decode($P_Info,true);

        foreach( $P_List as $key => $data )
        {
            $no = explode('_',$data)[1];
            $info = explode('|',$P_Info[$key][$data]);
            $result -> bindValue(":order",$order);
            $result -> bindValue(":no",$no);
            $result -> bindValue(":num",$info[3]);
            $result -> execute();
        }
    }
    if(isset($_REQUEST['G_List']))
    {
        $sql = 'insert into group_order ( grp_no , mem_id , grp_order_num , grp_order_cdate , reci_name , reci_tel , reci_addr) value ( :grp_no , :mem_id , :num , :grp_order_cdate , :reci_name , :reci_tel , :reci_addr )';
        $result = $pdo -> prepare($sql);
        $G_List = explode(',',$G_List);
        $G_Info = json_decode($G_Info,true);

        foreach( $G_List as $key => $data )
        {
            $no = explode('_',$data)[1];
            $info = explode('|',$G_Info[$key][$data]);
            $result -> bindValue(":grp_no",$no);
            $result -> bindValue(":mem_id",$member);
            $result -> bindValue(":num",$info[3]);
            $result -> bindValue(":grp_order_cdate",$today);
            $result -> bindValue(":reci_name",$recipient[0]);
            $result -> bindValue(":reci_tel",$recipient[1]);
            $result -> bindValue(":reci_addr",$recipient[2]);
            $result -> execute();
        }
    }
    if(isset($_REQUEST['D_List']))
    {
        $sql = 'insert into deco_order_list ( offi_order_no , deco_no , order_num ) value ( :order , :no , :num )';
        $result = $pdo -> prepare($sql);
        $D_List = explode(',',$D_List);
        $D_Info = json_decode($D_Info,true);

        foreach( $D_List as $key => $data )
        {
            $no = explode('_',$data)[1];
            $info = explode('|',$D_Info[$key][$data]);
            $result -> bindValue(":order",$order);
            $result -> bindValue(":no",$no);
            $result -> bindValue(":num",$info[3]);
            $result -> execute();
        }
    }

    $final = "下單成功";
    if(isset($order)) $final.="，訂單編號為$order";
    if(isset($_REQUEST['G_List'])) $final.="，團購商品訂單請至會員中心查看。";
    else $final.="。";

    echo $final;

}catch (PDOException $e){
    echo $e;
}
?>