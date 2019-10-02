<?php
$errMsg = "";
try {
    require_once "php/connectDataBase.php";
    $sql_favor = "select * from base where base_no between 1 and 3";
    $pdoStatement_favor = $pdo->query($sql_favor);
    $sql_ingred = "select * from ingredients where ingr_stat='上架' and ingr_no > 0";
    $pdoStatement_ingred = $pdo->query($sql_ingred);
    $sql_decor = "select * from decoration where deco_stat='上架' and deco_no > 0";
    $pdoStatement_decor = $pdo->query($sql_decor);
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>客製化</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
    integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" />
    <link rel="stylesheet" href="style/index.css" />
</head>
<body class="layout-bg">

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


    <!-- 登入提醒 -->
    <section class='lightBox' style='display:none;'>
    <div class="container">
      <div id="lightBox">
        <div class="login_password">
          <span class="btnLoginCancel" id="btnLoginCancel">
            <img src="img/prod/cancel.png" alt="cancel_icon">
          </span>
          <h3 class='login_title'>會員登入</h3>
          <input type="text" name="memId" id="memId" class="mem_login" placeholder="帳號">
          <br>
          <input type="password" name="memPsw" id="memPsw" class="mem_login" placeholder="密碼">
          <br>
          <a href="javascript:void(0)" id="forget_psw">忘記密碼</a>
          <br>
          <a href="javascript:void(0)" class="btn_focus" id="btnLogin">
            <p>登入</p>
          </a>
          </a>
          <br>
          <div class="notmem">
            <span>不是會員嗎?</span>
            <a href="javascript:void(0)" id="register">立即註冊</a>
            <br>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!------------- 登入的燈箱end-------------- -->
  <!------------- 註冊的燈箱star-------------- -->
  <section id="sign_box" class="sign_box" style='display:none;'>

    <div class="sign_lightBox">
      <div class="sign_content">
        <span class="btnSignCancel" id="btnSignCancel">
          <img src="img/prod/cancel.png" alt="cancel_icon">
        </span>
        <h3 class="sign_title">註冊會員</h3>
        <form action="" id="submitForm">
          <div class="sign_input_group">
            <div class="sign_input_item sign_id">
              <span>帳號:</span>
              <input type="text" class="sign_inputs" name="memId2" id="memId2" placeholder="帳號">
              <br>
            </div>
            <div class="sign_input_item">
              <span>
                <input type="button" value="帳號可以使用嗎?" id="btn_sign_check">
              </span>
              <p id="idMsg">檢查中</p>
            </div>
            <div class="sign_input_item sign_psw">
              <span>密碼:</span>
              <input type="password" class="sign_inputs" name="memPsw2" id="memPsw2" placeholder="密碼"> <!-- <br> -->
            </div>
            <div class="sign_input_item sign_psw">
              <span>確認密碼</span>
              <input type="password" class="sign_inputs" name="confirmPsw" id="confirmPsw" placeholder="確認密碼">
              <!-- <br> -->
            </div>
            <div class="sign_input_item sign_namd">
              <span>姓名:</span>
              <input type="text" class="sign_inputs" name="mem_name2" id="mem_name2" placeholder="姓名"> <!-- <br> -->

            </div>
            <div class="sign_input_item sign_email">
              <span>信箱:</span>
              <input type="email" class="sign_inputs" name="mem_email2" id="mem_email2" placeholder="信箱">
              <!-- <br> -->
            </div>
          </div>
          <a href="javascript:void(0)" class="btn_register" id="btn_register">
            <p>送出</p>
          </a>
        </form>
      </div>
    </div>
  </section>
  <!------------- 註冊的燈箱end-------------- -->

<!-- ***********9/25更新******************* -->
  <!-- navbar_star -->
  <header class="menu layout_header" id="layout_header">
    <div class="rwdnavbar">
      <button class="layout_menubtn">
        <span class="layout_menubtn-in">menu</span>
      </button>
      <a href='index_fron.html' class="rwdlogo">
        <img src="img/layout/logo_白邊.svg" alt="rwdlogo">
      </a>
      <div class="rwdLogin">
          <ul class="layout_login">
            <span id="btnlogloutRwd">&nbsp</span>
            <li>
              <a href="javascript:;" id="spanLoginRwd">
                <i class="fas fa-user-circle"></i>
              </a>
              <span id="spanLoginTextRwd" style="display:none">登入</span>
            </li>
            <li id="goCartShowRwd">
              <div class="prodCountRwd"></div>
              <a href="cart.html">
                <i class="fas fa-shopping-cart" id="shopCartRwd"></i>
              </a>
            </li>
          </ul>
      </div>
    </div>
    <nav class="layout_nav">
  
      <ul class="layout_logo">
        <h1 class="logo">
          <a class="logo_link" href="index_fron.html">派對</a>
        </h1>
      </ul>
      <ul class="layout_items">
        <li class="layout_itemlink">
          <a class="layout_link" href="cust.php">客制派</a>
        </li>
        <li class="layout_itemlink">
          <a class="layout_link" href="prod.html">派對商品</a>
        </li>

        <li class="layout_itemlink">
          <a class="layout_link" href="buy.html">派對團購</a>
        </li>
        <li class="layout_itemlink">
          <a class="layout_link" href="vot.html">派對投票</a>
        </li>
        <li class="layout_itemlink">
          <a class="layout_link" href="cars.html">派對活動</a>
        </li>
      </ul>
      <ul class="layout_login">
        <span id="btnloglout">&nbsp</span>
        <li>
          <a href="javascript:;" id="spanLogin">
            <i class="fas fa-user-circle"></i>
          </a>
          <span id="spanLoginText" style="display:none">登入</span>
        </li>
        <li id="goCartShow">
          <div class="prodCount"></div>
          <a href="cart.html">
            <i class="fas fa-shopping-cart" id="shopCart"></i>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <!-- navbar_end -->

    <!-- Cust Title -->
    <div class="contsiner">
        <div class="container-out layout_cust">
            <center><h2 class="cust_slogan">客製一個屬於自己的團購商品吧!</h2></center>
            <div class="layout_newtitle">
                <h2 class="layout_nesh2">客制派</h2>
            </div>
        </div>
    </div>

    <!-- Content Start -->
    <section class="cust_section">
        <div class="container">
            <div class="cust_listBox_sticky">
                <!-- 桌基板的清單 -->
                <div class="list_box">
                    <img src="img/cust/list.png" alt="" class="list" />
                    <ul class="list_text_box cust_w80p">
                        <li class="list_favor_box list_details">
                            基底
                            <ul>
                                <li class="favor_details"></li>
                            </ul>
                        </li>
                        <li class="list_ingred_box list_details">
                            配料<button id="clearIngr" class="cust_buttons">清除</button>
                            <ul>
                                <!-- <li>紅豆</li>
                                <li>鳳梨</li> -->
                            </ul>
                        </li>
                        <li class="list_decor_box list_details">
                            裝飾品<button id="clearDeco" class="cust_buttons">清除</button>
                            <ul>
                                <!-- <li>掃把</li>
                                <li>手指餅乾</li>
                                <li>哈哈哈</li> -->
                            </ul>
                        </li>
                    </ul>
                    <div class="price_box cust_w80p">
                        <p>NTD:<span></span></p>
                    </div>
                </div>
                <!-- RWD 的清單 -->
                <div class="cust_RWD-list_box">
                    <img src="img/cust/RWD-list.png" alt="" class="RWD-list" />
                    <!-- 09-09 list detail -->
                    <ul class="list_text_box">
                        <li class="list_favor_box list_details">
                            基底
                            <ul>
                                <li class="favor_details"></li>
                            </ul>
                        </li>
                        <li class="list_ingred_box list_details">
                            配料<button id="RWD_clearIngr" class="cust_RWD_buttons">清除</button>
                            <ul>
                                <!-- <li>紅豆</li>
                                <li>鳳梨</li> -->
                            </ul>
                        </li>
                        <li class="list_decor_box list_details">
                            裝飾品<button id="RWD_clearDeco" class="cust_RWD_buttons">清除</button>
                            <ul>
                                <!-- <li>掃把</li>
                                <li>手指餅乾</li>
                                <li>哈哈哈</li> -->
                            </ul>
                        </li>
                    </ul>
                    <div class="price_box">
                        <p>NTD:<span></span></p>
                    </div>
                </div>
            </div>
            <div class="cust_steps">

                <!-- 第一步驟 -->
                <div class="cust_steps_in cust_w100p">
                    <div class="step_desc">
                        <img src="img/cust/pumpkin.png" alt="step_desc">
                        <h3>第一步<br><span>選擇一種基底風格</span></h3>
                    </div>
                    <div class="all_favor_box">
                        <!-- SQL -->
                        <?php
                        while($rowF = $pdoStatement_favor->fetch(PDO::FETCH_ASSOC)){
                        ?>
                        <div class="favor_box cust_posiR">
                            <img src="img/cust/style.png" alt="style" class="favor_img cust_Rw100p">
                            <img src="<?php echo $rowF["base_img"]; ?>" class="pie_img cust_posiA cust_right10p" />
                            <span class="favor_style cust_posiA cust_top10p cust_right20p"><?php echo $rowF["base_style"]; ?></span>
                            <h3 class="favor_title cust_posiA cust_bottom20p cust_right40p"><?php echo $rowF["base_name"]; ?></h3>
                            <img src="<?php echo $rowF["mascot"]; ?>" alt="" class="mascot cust_w60p cust_posiA cust_bottom0p" />
                            <input class="base_no" type="hidden" value="<?php echo $rowF["base_no"]; ?>">
                            <input class="cust_base_price" type="hidden" value="<?php echo $rowF["base_price"]; ?>">
                        </div>
                        <?php } ?>
                        <!-- <div class="favor_jp favor_box cust_posiR">
                            <img src="img/cust/style.png" alt="style" class="favor_img cust_Rw100p">
                            <img src="img/cust/jp_pie.png" alt="japan pie" class="pie_img cust_posiA cust_right10p" />
                            <span class="favor_style cust_posiA cust_top10p cust_right20p">日式風</span>
                            <h3 class="favor_title cust_posiA cust_bottom20p cust_right40p">抹茶派</h3>
                            <img src="img/cust/3.png" alt="" class="mascot cust_w60p cust_posiA cust_bottom0p" />
                            <input class="base_no" type="hidden" value="1">
                        </div>
                        <div class="favor_china favor_box cust_posiR">
                            <img src="img/cust/style.png" alt="style" class="favor_img cust_Rw100p">
                            <img src="img/cust/west_pie.png" alt="japan pie" class="pie_img cust_posiA cust_right10p" />
                            <span class="favor_style cust_posiA cust_top10p cust_right20p">西式風</span>
                            <h3 class="favor_title cust_posiA cust_bottom20p cust_right40p">南瓜派</h3>
                            <img src="img/cust/2.png" alt="" class="mascot cust_w60p cust_posiA cust_bottom0p" />
                            <input class="base_no" type="hidden" value="2">
                        </div>
                        <div class="favor_west favor_box cust_posiR">
                            <img src="img/cust/style.png" alt="style" class="favor_img cust_Rw100p">
                            <img src="img/cust/china_pie.png" alt="japan pie" class="pie_img cust_posiA cust_right10p" />
                            <span class="favor_style cust_posiA cust_top10p cust_right20p">中式風</span>
                            <h3 class="favor_title cust_posiA cust_bottom20p cust_right40p">竹炭派</h3>
                            <img src="img/cust/1.png" alt="" class="mascot cust_w60p cust_posiA cust_bottom0p" />
                            <input class="base_no" type="hidden" value="3">
                        </div> -->
                    </div>
                    <!-- btn -->
                    <div class="cust_btn_box">
                        <div class="cust_btn" id="firstBtn_next">
                            <img src="img/cust/button.png" alt="button" />
                            <span class="btn_text">下一步</span>
                        </div>
                    </div>
                </div>


                <!-- 第二步驟 -->
                <div class="cust_steps_in cust_w100p">
                    <div class="cust_steps_in_container">
                        <div class="cust_scrollbox">
                            <img class="prople" src="img/cust/2.png" alt="" />
                            <div class="step_desc">
                                <img src="img/cust/pumpkin.png" alt="step_desc">
                                <h3>第二步<br><span>可選擇最多2種配料</span></h3>
                            </div>
                            <div class="cust_pieshow">
                                <img class="pie" src="img/cust/west_pie.png" alt="" />
                                <!-- 被選擇配料的預設空間 -->
                                <div class="selectIngred selectIngred_1">
                                <img src="img/cust/small/000.png" alt="ingredient" class="ingredient cust_w100p" />
                                </div>
                                <div class="selectIngred selectIngred_2">
                                <img src="img/cust/small/000.png" alt="ingredient" class="ingredient cust_w100p" />
                                </div>
                            </div>
                            <img class="wood" src="img/cust/wood.png" alt="" />
                        </div>
                        <?php
                        if($errMsg != ""){
                            echo "<center> $errMsg </center>";
                        }
                        else{
                        ?>
                        <div class="cust_aside">
                            <img src="img/cust/asideBox.png" alt="" />
                            <div class="cust_ingred_box">
                                <?php
                                while($row = $pdoStatement_ingred->fetch(PDO::FETCH_ASSOC)){
                                ?>
                                <div class="cust_item cust_item_ingred">
                                    <img src="<?php echo $row["ingr_img"]; ?>" alt="" />
                                    <span><?php echo $row["ingr_name"]; ?></span>
                                    <input class="ingr_price" type="hidden" value="<?php echo $row["ingr_price"]; ?>">
                                    <input class="ingr_no" type="hidden" value="<?php echo $row["ingr_no"]; ?>">
                                </div>
                                <?php } ?>
                                <!-- <div class="cust_item cust_item_ingred">
                                    <img src="img/cust/big/redBean.png" alt="" />
                                    <span>紅豆</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_ingred">
                                    <img src="img/cust/big/ham.png" alt="" />
                                    <span>火腿</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_ingred">
                                    <img src="img/cust/big/almond.png" alt="" />
                                    <span>杏仁</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_ingred">
                                    <img src="img/cust/big/springOnion.png" alt="" />
                                    <span>蔥花</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_ingred">
                                    <img src="img/cust/big/egg.png" alt="" />
                                    <span>蛋黃</span>
                                    <input type="hidden" value="90">
                                </div> -->
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <!-- btn -->
                    <div class="cust_btn_box">
                        <div class="cust_btn" id="secondBtn_last">
                            <img src="img/cust/button.png" alt="button" />
                            <span class="btn_text">上一步</span>
                        </div>
                        <div class="cust_btn" id="secondBtn_next">
                            <img src="img/cust/button.png" alt="button" />
                            <span class="btn_text">下一步</span>
                        </div>
                    </div>
                </div>


                <!-- 第三步驟 -->
                <div class="cust_steps_in cust_w100p">
                    <div class="cust_steps_in_container">
                        <div class="cust_scrollbox">
                            <img class="prople" src="img/cust/2.png" alt="" />
                            <div class="step_desc">
                                <img src="img/cust/pumpkin.png" alt="step_desc">
                                <h3>第三步<br><span>可選擇3個裝飾品</span></h3>
                            </div>
                            <div class="cust_pieshow" id="cust_final_pie">
                                <img id="selectFavor_pie" class="pie" src="img/cust/west_pie.png" alt="" />
                                <!-- 被選擇配料的預設空間 -->
                                <div class="selectIngred selectIngred_1">
                                    <img id="selectIngred_1" src="img/cust/small/000.png" alt="ingredient" class="ingredient cust_w100p" />
                                </div>
                                <div class="selectIngred selectIngred_2">
                                    <img id="selectIngred_2" src="img/cust/small/000.png" alt="ingredient" class="ingredient cust_w100p" />
                                </div>
                                <!-- 被選擇裝飾品的預設空間 -->
                                <div class="selectDecor_box">
                                    <div class="selectDecor selectDecor_1">
                                        <img src="img/cust/small/000.png" alt="decoration" id="selectDecor_1" class="cust_w100p"/>
                                    </div>
                                    <div class="selectDecor selectDecor_2">
                                        <img src="img/cust/small/000.png" alt="decoration" id="selectDecor_2" class="cust_w100p"/>
                                    </div>
                                    <div class="selectDecor selectDecor_3">
                                        <img src="img/cust/small/000.png" alt="decoration" id="selectDecor_3" class="cust_w100p"/>
                                    </div>
                                </div>
                            </div>
                            <img class="wood" src="img/cust/wood.png" alt="" />
                        </div>

                        <?php
                        if($errMsg != ""){
                            echo "<center> $errMsg </center>";
                        }
                        else{
                        ?>
                        <div class="cust_aside">
                            <img src="img/cust/asideBox.png" alt="" />
                            <div class="cust_ingred_box">
                                <?php
                                while($rowD = $pdoStatement_decor->fetch(PDO::FETCH_ASSOC)){
                                ?>
                                <div class="cust_item cust_item_decor">
                                    <img src="<?php echo $rowD["deco_img"]; ?>" alt="" />
                                    <span><?php echo $rowD["deco_name"]; ?></span>
                                    <input class="deco_price" type="hidden" value="<?php echo $rowD["deco_price"]; ?>">
                                    <input class="deco_no" type="hidden" value="<?php echo $rowD["deco_no"]; ?>">
                                </div>
                                <?php } ?>
                                <!-- <div class="cust_item cust_item_decor">
                                    <img src="img/cust/big/redBean.png" alt="" />
                                    <span>紅豆</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_decor">
                                    <img src="img/cust/big/ham.png" alt="" />
                                    <span>火腿</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_decor">
                                    <img src="img/cust/big/almond.png" alt="" />
                                    <span>杏仁</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_decor">
                                    <img src="img/cust/big/springOnion.png" alt="" />
                                    <span>蔥花</span>
                                    <input type="hidden" value="90">
                                </div>
                                <div class="cust_item cust_item_decor">
                                    <img src="img/cust/big/egg.png" alt="" />
                                    <span>蛋黃</span>
                                    <input type="hidden" value="90">
                                </div> -->
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <div class="cust_btn_box">
                        <div class="cust_btn" id="thirdBtn_last">
                            <img src="img/cust/button.png" alt="button" />
                            <span class="btn_text">上一步</span>
                        </div>
                        <div class="cust_btn" id="thirdBtn_next">
                            <img src="img/cust/button.png" alt="button" />
                            <span class="btn_text">下一步</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section class="cust_message">
        <div class="container">
            <div class="card_message">
                <form class="cust_card_form" id="custForm" name="custForm" method="post" enctype="multipart/form-data">
                    <input name="hidden_data" id="hidden_data" type="hidden">
                    <input name="input_base" id="input_base" type="hidden">
                    <input name="input_selectIngred_1" id="input_selectIngred_1" type="hidden">
                    <input name="input_selectIngred_2" id="input_selectIngred_2" type="hidden">
                    <input name="input_selectDecor_1" class="input_selectDecor" id="input_selectDecor_1" type="hidden">
                    <input name="input_selectDecor_2" class="input_selectDecor" id="input_selectDecor_2" type="hidden">
                    <input name="input_selectDecor_3" class="input_selectDecor" id="input_selectDecor_3" type="hidden">
                    <input name="cust_price" id="cust_price" type="hidden">
        
                    取個名字吧 :
                    <input type="text" name="msgTitle" class="msgTitle" placeholder="大眼怪怪..." /><br />
                    <textarea name="msgContent" class="msgContent" cols rows="100" maxbytes="500" maxlength="500"
                            placeholder="增加文字說明，讓使用者投你一票，讓你的客製派衝上團購標準。"></textarea>
                </form>
                <canvas id="custCanvas"></canvas>
            </div>
            <!-- btn -->
            <div class="cust_btn_box cust_submitBtn_box">
                <div id="submitContent" class="cust_btn">
                    <img src="img/cust/button.png" alt="button" class="cust_submitBtn" />
                    <span class="btn_text">客製完成</span>
                </div>
            </div>
        </div>
    </section>

    <!-- <img src="img/customized/20190922.jpg" id="cust_printPNG" class="cust_w50p" alt=""> -->

    <!-- 彈窗抽獎 -->
    <div id="cust_pop" class="cust_pop">
        <div class="lot_background cust_posiR cust_w50p">
            <img class="pop_background cust_w100p" src="img/cust/lottery_box.png" alt="">
            <div class="pop_chatBox cust_posiA">
                <img src="img/cust/chatBox.png" class="cust_w100p" alt="">
                <p class="cust_posiA">您的客製派已在投票頁嘍~<br>前往投票頁<br>或 查看更多商品</p>
            </div>
            <div class="lot_mascot mascot cust_posiA">
                <img src="img/cust/2.png" class="cust_w100p">
            </div>
            <div class="pop_pieshow cust_posiA">
            <img src="img/customized/20190922.jpg" id="cust_printPNG" class="cust_w100p" alt="">
            </div>   
            <div class="lot_detail cust_posiA">
                <img src="img/cust/lot_detail.png"  class="cust_w100p">
                <p class="cust_posiA">優惠獎勵 九折優惠</p>
            </div>
            <div class="cust_btn_box">
                <div class="cust_btn">
                    <img src="img/cust/button.png" alt="button" class="lastStep" />
                    <span class="btn_text pop_btn_text">前往投票區</span>
                    <a href="vot.html" class="out-set5"></a>
                </div>
                <div class="cust_btn" id="secondBtn_next">
                    <img src="img/cust/button.png" alt="button" class="nextStep" />
                    <span class="btn_text pop_btn_text">查看更多商品</span>
                    <a href="prod.html" class="out-set5"></a>
                </div>
            </div>
        </div>
        <div class="cust_btn_box_forRWD">
            <div class="cust_btn_forRWD">
                <img src="img/cust/button.png" alt="button" class="lastStep" />
                <span class="btn_text pop_btn_text">前往投票區</span>
                <a href="vot.html" class="out-set5"></a>
            </div>
            <div class="cust_btn_forRWD" id="secondBtn_next">
                <img src="img/cust/button.png" alt="button" class="nextStep" />
                <span class="btn_text pop_btn_text">查看更多商品</span>
                <a href="prod.html" class="out-set5"></a>
            </div>
        </div>
    </div>


    <!-- footer在這 -->
    <footer class="layout_footer">
        <div class="layout_footericons">
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-line"></i>
        </div>
        <div class="container"></div>
    </footer>

    <!-- All the Js documents -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.2/velocity.min.js"></script>
    <script src="php/login/header_member.js"></script>  <!-- For login -->
    <script src="js/menu.js"></script>                  <!-- ?? -->
    <script src="js/scroll.js"></script>                <!-- Scroll buttons -->
    <script src="js/pieSelect.js"></script>             <!-- Pie customized -->
    <script src="js/pie2png.js"></script>
    <script src="js/addCart_prod.js"></script>
   
 
</body>
</html>