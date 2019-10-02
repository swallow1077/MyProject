<?php
header('Content-type: text/html; charset=UTF-8');
try{
    require_once('connectDataBase.php');

    $pageID = $_REQUEST['pageID'];
    
    if(isset($_REQUEST['filter']) && $_REQUEST['filter'] != "null" ) $filter = $_REQUEST['filter'];
    else $filter = "new";

    $filterOption = $filter == "new" ? "g.grp_cdate" : "g.grp_count";

    $limit = ($pageID-1) * 8;

    $sql = 'select g.grp_no "g_no" , g.grp_cdate "g_dt" , c.cust_no "c_no" , b.base_no "b_no" , i1.ingr_no "i1_no" , i2.ingr_no "i2_no" , d1.deco_no "d1_no" , d2.deco_no "d2_no" , c.cust_name , b.base_name , i1.ingr_name "i1" , i2.ingr_name "i2" , d1.deco_name "d1" , d2.deco_name "d2" , (b.base_health_lv + i1.ingr_health_lv + i2.ingr_health_lv + d1.deco_health_lv + d2.deco_health_lv) as "health_lv" , (b.base_sweet_lv + i1.ingr_sweet_lv + i2.ingr_sweet_lv + d1.deco_sweet_lv + d2.deco_sweet_lv) as "sweet_lv" , (b.base_salty_lv + i1.ingr_salty_lv + i2.ingr_salty_lv + d1.deco_salty_lv + d2.deco_salty_lv) as "salty_lv" , g.grp_count , g.grp_price from group_shopping g
    JOIN custom_product c on g.cust_no = c.cust_no 
    JOIN base b on b.base_no = c.base_no
    JOIN ingredients i1 on c.ingr_no_1 = i1.ingr_no
    JOIN ingredients i2 on c.ingr_no_2 = i2.ingr_no
    JOIN decoration d1 on c.deco_no_1 = d1.deco_no
    JOIN decoration d2 on c.deco_no_2 = d2.deco_no
    order by '.$filterOption.' desc limit '.$limit.',8';

    $result = $pdo -> prepare($sql);
    // $result -> bindValue(":limit",$limit);
    $result -> execute();
    $data = $result -> fetchAll(PDO::FETCH_ASSOC);
    if(count($data) < 1)
    {
        echo "查無資料";
    }
    else
    {
        echo json_encode( $data );
    }
}catch (PDOException $e){
    echo $e;
}
?>