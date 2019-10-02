<?php
session_start();
$errMsg = "";
$total = 0;
$prod_no=$_REQUEST["prod_no"];
$mem_id = "";
$mem_img = "";
$countMes = "0";
$averageStar = "0";
$averageStarnew = "0";

//連線資料庫
try{

  require_once("php/connectDataBase.php");

  // --印出產品資料
  $sql = "SELECT `prod_no`,`prod_name`,`base_name`,`ingr_name`,`ingr_no_1`,
  `ingr_no_2`,`deco_no_1`,`deco_no_2`,`prod_price`,`prod_desc`,`prod_img`,
  `prod_eva`,`prod_eva_count` 
  FROM official_product a 
  LEFT JOIN base b ON a.`base_no`=b.`base_no` 
  LEFT JOIN ingredients i ON a.`ingr_no_1`=i.`ingr_no`
  where prod_no = :prod_no";

  $product_in = $pdo->prepare($sql);
  $product_in->bindValue(":prod_no",$prod_no);
  $product_in->execute();
  // exit($product_in->rowCount());

  // --印出第二筆配料
  $sql = "SELECT `prod_no`,`prod_name`,`base_name`,`ingr_name`,`ingr_no_1`,
  `ingr_no_2`,`deco_no_1`,`deco_no_2`,`prod_price`,`prod_desc`,`prod_img`,
  `prod_eva`,`prod_eva_count` 
  FROM official_product a 
  LEFT JOIN base b ON a.`base_no`=b.`base_no` 
  LEFT JOIN ingredients i ON a.`ingr_no_2`=i.`ingr_no`
  where prod_no = :prod_no";

  $ingreds = $pdo->prepare($sql);
  $ingreds->bindValue(":prod_no",$prod_no);
  $ingreds->execute();

  
  // --印出留言內容
  $sql2 = "select * from `message_comment` a 
  LEFT JOIN `member` b on a.mem_id=b.mem_id 
  where prod_no = :prod_no
  ORDER BY `msg_cdate` desc";

  $commets = $pdo->prepare($sql2);
  $commets->bindValue(":prod_no",$prod_no);
  $commets->execute();
  // $countMes = count($prodRows2);
  // $averageStar = $total / $countMes;
  
  //判斷會員是否登入 顯示會員資料
  if(isset($_SESSION["memId"])){
    $mem_id= $_SESSION["memId"];
    $mem_img = $_SESSION["memImg"];

  }else{
    $mem_id="訪客";
    $mem_img = "img/prd_in_img/Original.jpg";
  }


?>
<script>
let storage = sessionStorage;
storage['dataInfoId'] = '<?=$_REQUEST["prod_no"]?>';
</script>

<?php

}catch(PDOException $e){
  $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
  $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
  echo $errMsg;
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
require_once("header.html"); //共用header//
?> 

<body class="prd_in_show layout-bg">

<?php 
while($prodRow = $product_in -> fetch(PDO::FETCH_ASSOC)){
?>

 <div class="wrap_bg">
   <div class="prdIn_container">
    <!-- ==========商品介紹================================================= -->
    <section class="prd_in_main">
      <div class="container">
        <div class="prd_in_titleshow">
          <h2 class="prd_in_title"><?=$prodRow["prod_name"]?></h2>
        </div>
        <div class="prd_in_group">
          <div class="prd_in_imggroup">
            <div class="item_img">
              <img class="main_img" src="<?=$prodRow["prod_img"]?>">
            </div>
            <div class="item_price">
              <div class="price_group">
                <p class="price">價格:</p>
                <p id="pnum" class="pnum"><?=$prodRow["prod_price"]?></p>
              </div>
              <div class="cart_group">
                <a href="#" onclick=findCartBtn(prodId) class="btn_cart card_cart">加入購物車</a>
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
              <p class="prd_in_text"><?=$prodRow["prod_desc"]?></p>
            </div>
            <?php 
            while($ingred = $ingreds -> fetch(PDO::FETCH_ASSOC)){
            ?>
            <div class="item_ctx">
              <h3 class="item_ingred">成分:</h3>
              <p class="item_base">基底:<span><?=$prodRow["base_name"]?></span></p>
              <p class="item_match">配料:<span><?=$prodRow["ingr_name"]?></span></p>
              <p class="item_match"><span><?=$ingred["ingr_name"]?></span></p>
            </div>
            <?php
            }
            ?>
            <div class="good_star">
              <h3 class="rating">好評度:</h3>
              <div class="star_group">
                <div class="star_txt">
                  <p class="score_avg">0<?=$prodRow["prod_eva"]?></p>
                  <p class="total">/5</p>
                </div>
                <div class="fivestar">
                <!-- for印出星星評比數量 -->
                <?php
                  for($i=1;$i<=$prodRow["prod_eva"];$i++){
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
      <!-- </div> -->
    </section>
      
    <!-- ===================評價============================ -->
    <section class="prd_in_commet">
      <div class="container" id="container">
        <div class="prd_in_titleshow">
          <h2 class="prd_in_title">商品評價</h2>
        </div>
        <?php 
        while($prodRows2 = $commets -> fetchAll(PDO::FETCH_ASSOC)){
          $countMes = count($prodRows2); 
        ?>
        <!-- 動態產生留言 -->
        <?php
          foreach( $prodRows2 as $i => $prodRow2){
            $total += $prodRow2['mem_eva'];
        ?>
        
        <div class="mem">
          <div class="msg_pic">
            <img src="<?=$prodRow2["mem_img"]?>" alt="mem_pic" class="msg_img">
          </div>
          <div class="msg_txt">
            <div class="msg_title">
              <p class="msg_id"><?=$prodRow2["mem_id"]?></p>
              <div class="fivestar">
              <?php
                for($i=1;$i<=$prodRow2["mem_eva"];$i++){
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
          <button class="report" id="report" msgNo="<?=$prodRow2["msg_no"]?>">...</button>
        </div>
        

        <?php
        $averageStar = $total / $countMes;
        $averageStarnew = number_format($averageStar, 0, '.', '');
        // echo $total;
        };
        ?>
          
    </section>

    <?php     
      };
      // $total;
      // $averageStar = $total / $countMes;
      // echo $countMes."總數";
      // echo $averageStar;
    ?>


    
    <!-- =================我要留言======================== -->
    <section class="comment_out">
      <div class="container">
        <h3 class="post_title">我要留言</h3>
        <div class="post_content">
          <div class="post_pic">
            <img src="<?=$mem_img?>" alt="img_pic" class="post_img">
          </div>
          <form action="" id="post_cmt" class="post_cmt" name="addMes">
            <div class="form_id">
              <input type="hidden" name="mem_id" value="<?=$mem_id?>" id="mem_id">
              <input type="hidden" name="prod_no" value="<?=$prodRow["prod_no"]?>" id="prod_no">
              <p class="nick_name"><?=$mem_id?></p>
              <!-- <input type="text" name="msg_name" class="msg_name" id="msg_name"> -->
              <div id="rankStar" class="fivestar" >
                <img src="img/prd_in_img/star_en.png" alt="星" class="star" id="star1">
                <img src="img/prd_in_img/star_en.png" alt="星" class="star" id="star2">
                <img src="img/prd_in_img/star_en.png" alt="星" class="star" id="star3">
                <img src="img/prd_in_img/star_en.png" alt="星" class="star" id="star4">
                <img src="img/prd_in_img/star_en.png" alt="星" class="star" id="star5">
              </div>
            </div>
            <div class="form_txt">
              <textarea class="form_area" name="comment_content" id="comment_content" maxlength="200"
                placeholder="發表留言..."></textarea>
                <div id="msg_cdate"></div>
            </div>
            <div class="comment_btn">
              <button type="button" class="msn_btn" id="msn_btn">送出</button>
            </div>
          </form>
        </div>
      </div>
    </section> 
  </div>
</div>

<!-- 登入提醒 -->
<section class="loginRemind" style='display:none;'>
  <div class="container">
      <div id="loginRemind">
          <div class="loginRemind_content">
              <h3 class="loginRemind_title">登入通知</h3>
              <span class="loginRemind_title">您還沒有登入會員喔~</span>
              <br>
              <a class="loginRemind_btn" id="loginRemind_wantLongin"><p>我要登入</p></a>
              <a class="loginRemind_btn" id="loginRemind_cancelLongin"><p>取消</p></a>
          </div>
      </div>
  </div>
</section>


<!-- footer區塊 -->
<!-- <footer class="layout_footer">
  <div class="container">
    <div class="layout_footericons">
      <i class="fab fa-facebook-square"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-line"></i>
    </div>
  </div>
</footer> -->
<footer class="layout_footer">
        <div class="layout_footericons">
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-line"></i>
        </div>
        <div class="container"></div>
    </footer>

<?php     
  };
  ?>

<script src="js/report.js"></script>
<script src="js/message.js"></script>
<script src="js/addInset.js"></script>
<script src="js/addCollectInset.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.all.min.js'></script>


<script>
  function $id(id){
  return document.getElementById(id);
  };
  // --計算星星平均與評價總數
  function CalNum()
  {
    console.log(document.getElementsByClassName('evatimes')[0].getElementsByTagName('span'));
    document.getElementsByClassName('evatimes')[0].getElementsByTagName('span')[0].innerText = "<?=$countMes?>"; 
    console.log(document.getElementsByClassName('score_avg')[0]);
    document.getElementsByClassName('score_avg')[0].innerText = "<?=$averageStarnew?>";

  }

  function loginYes() { 
    if($id('spanLoginText').innerText == '登出' || $id('spanLoginTextRwd').innerText == '登出'){
      document.getElementsByClassName('nick_name')[0].innerText = "<?=$mem_id?>"; 
    }

   };

  window.addEventListener('load',CalNum,false);
  window.addEventListener('load',loginYes,false);

</script>
</body>

</html>