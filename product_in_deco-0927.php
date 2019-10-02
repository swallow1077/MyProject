<?php
// echo $prod_no;
$errMsg = "";
$total = 0;
// exit("=================".$_GET["prod_no"]);

//exit( "aaaaaaaaaaaaaaaa" );

$deco_no = $_REQUEST["deco_no"];
$countMes = "0";
$averageStar = "0";
$averageStarnew = "0";

?>

<script>
let storage = sessionStorage;
storage['dataInfoId'] = '<?=$deco_no?>';
</script>

<?php
// $deco_no=$_REQUEST["deco_no"];
// exit($_REQUEST["deco_no"]);
//連線資料庫
try {

    require_once "php/connectDataBase.php";
    // $prod_no = $_REQUEST["prod_no"];

    // --印出產品資料
    $sql = "SELECT `deco_no`,`deco_name`,`deco_img`,`deco_price`,`deco_desc`,`deco_eva`
  FROM decoration d
  -- LEFT JOIN base b ON a.`base_no`=b.`base_no`
  -- LEFT JOIN ingredients i ON a.`ingr_no_1`=i.`ingr_no`
  where deco_no = :deco_no";

    $product_in = $pdo->prepare($sql);
    $product_in->bindValue(":deco_no", $deco_no);
    // $product_in->bindValue(":deco_no",$deco_no);
    $product_in->execute();
    // exit($product_in->rowCount());

    // --印出留言內容
    $sql2 = "select * from `message_comment` a
  LEFT JOIN `member` b on a.mem_id=b.mem_id
  where prod_no = 1
  ORDER BY `msg_cdate` desc";

    $commets = $pdo->prepare($sql2);
    $commets->execute();
    // $countMes = count($prodRows2);
    // $averageStar = $total / $countMes;

} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
    echo "--------------", $errMsg;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>商品內頁</title>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/js/all.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

  <link rel="stylesheet" href="style/index.css">
</head>

<?php
require_once "header.html"; //共用header//
?>

<body class="prd_in_show layout-bg">


<?php
while ($prodRow = $product_in->fetch(PDO::FETCH_ASSOC)) {
    ?>

 <div class="wrap_bg">
   <div class="prdIn_container">
    <!-- ==========商品介紹================================================= -->
    <section class="prd_in_main">
      <div class="container">
        <div class="prd_in_titleshow">
          <h2 class="prd_in_title"><?=$prodRow["deco_name"]?></h2>
        </div>
        <div class="prd_in_group">
          <div class="prd_in_imggroup">
            <div class="item_img">
              <img class="main_img" src="<?=$prodRow["deco_img"]?>">
            </div>
            <div class="item_price">
              <div class="price_group">
                <p class="price">價格:</p>
                <p id="pnum" class="pnum"><?=$prodRow["deco_price"]?></p>
              </div>
              <div class="cart_group">
                <a href="#" class="btn_cart">加入購物車</a>
                <a href="#" class="btn_heart">
                  <img src="img/prod/collect.png" alt="heart" class="pro_in_heart">
                </a> 
              </div>
            </div>

          </div>
          <!-- =====介紹文字==================== -->
          <div class="prd_in_txtgroup">
            <div class="item_dsc">
              <h3 class="prd_in_title">商品介紹:</h3>
              <p class="prd_in_text"><?=$prodRow["deco_desc"]?></p>
            </div>
            <!-- <div class="item_ctx">
              <h3 class="item_ingred">成分:</h3>
              <p class="item_base">基底:<span></span></p>
              <p class="item_match">配料:<span></span></p>
            </div> -->
            <div class="good_star">
              <h3 class="rating">好評度:</h3>
              <div class="star_group">
                <div class="star_txt">
                  <p class="score_avg"><?=$prodRow["deco_eva"]?></p>
                  <p class="total">/5</p>
                </div>
                <div class="fivestar">
                <!-- for印出星星評比數量 -->
                <?php
for ($i = 0; $i < $prodRow["deco_eva"]; $i++) {
        ?>
                  <img src="img/prd_in_img/star_true.png" alt="星" class="star">
                <?php
}
    ?>
                </div>
              </div>
            </div>
            <p class="evatimes">共<span>0</span>則評價</p>
          </div>
        </div>
      </div>

    <!-- ===================評價============================ -->
<?php
while ($prodRows2 = $commets->fetchAll(PDO::FETCH_ASSOC)) {
        $countMes = count($prodRows2);

        ?>

<section class="prd_in_commet">
  <div class="container" id="container">
    <div class="prd_in_titleshow">
      <h2 class="prd_in_title">商品評價</h2>
    </div>
    <!-- 動態產生留言 -->
    <?php
foreach ($prodRows2 as $i => $prodRow2) {
            $total += $prodRow2['mem_eva'];
            ?>

    <div class="mem">
      <input type="hidden" name="<?=$prodRow2["msg_no"]?>">
      <!-- <p><?=$prodRow2["msg_no"]?></p> -->
      <div class="msg_pic">
        <img src="<?=$prodRow2["mem_img"]?>" alt="mem_pic" class="msg_img">
      </div>
      <div class="msg_txt">
        <div class="msg_title">
          <p class="msg_id"><?=$prodRow2["mem_id"]?></p>
          <div class="fivestar">
          <?php

            for ($i = 0; $i <= $prodRow2["mem_eva"]; $i++) {
                ?>
            <img src="img/prd_in_img/star_true.png" alt="星" class="star">
          <?php
}
            ?>
          </div>
        </div>
        <div class="msg_info">
          <p class="msg_content"><?=$prodRow2["msg_text"]?></p>
        </div>
        <p class="msg_time"><span>留言時間:</span><?=$prodRow2["msg_cdate"]?></p>
      </div>
      <button class="report" id="report" repNo="<?=$prodRow2["msg_no"]?>">...</button>

    </div>


    <?php
$averageStar = $total / $countMes;

        }
        ;
        ?>

    <!-- --顯示檢舉--------------------------------- -->
    <!-- <div class="reportboxbody" >
      <div class="reportbox">
        <p>要檢舉這則留言嗎?</p>
        <button id="report_cancel">取消</button>
        <button id="report_sure" class="report_sure">確定</button>
      </div>

    </div>
    <div class="reportsend">
      <div class="reportsendbox">
        <p>檢舉已成功</p>
      </div>

    </div> -->


</section>

<script>
    // --計算星星平均與評價總數
    function CalNum()
    {
      console.log(document.getElementsByClassName('evatimes')[0].getElementsByTagName('span'));
      document.getElementsByClassName('evatimes')[0].getElementsByTagName('span')[0].innerText = "<?=$countMes?>";
      console.log(document.getElementsByClassName('score_avg')[0]);
      document.getElementsByClassName('score_avg')[0].innerText = "<?=$averageStar?>";
    }
    window.addEventListener('load',CalNum,false);

</script>
<?php
}
    ;
    // $total;
    // $averageStar = $total / $countMes;
    // echo $countMes."總數";
    // echo $averageStar;
    ?>



    <!-- =================我要留言======================== -->

  <?php
require "content.html";
    ?>

  </div>
  </div>
  <!-- footer區塊 -->
  <footer class="layout_footer">
        <div class="layout_footericons">
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-line"></i>
        </div>
    </footer>

<?php
}
;
?>


<!-- <script src="js/prd_in.js"></script> -->
<script src="js/report.js"></script>
<script src="js/addInset_deco.js"></script>

</body>

</html>