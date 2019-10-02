<?php
session_start();
$errMsg = "";

if (isset($_SESSION["memId"])) {
    $mem_id = $_SESSION["memId"];
    // echo $mem_id;
    //連線資料庫
    try {
        require_once "php/connectDataBase.php";

        //   --取會員資料
        $sqlmem = "SELECT *
        FROM member
        where  `mem_id` = :mem_id";
        $members = $pdo->prepare($sqlmem);
        $members->bindValue(":mem_id", $mem_id);
        $members->execute();

        //   --取一般訂單資料
        $sqlorder = "SELECT *
        FROM member m
        LEFT JOIN official_order o ON m.`mem_id`=o.`mem_id`
        where  m.`mem_id` = :mem_id
        order by offi_order_cdate desc";
        $offiorders = $pdo->prepare($sqlorder);
        $offiorders->bindValue(":mem_id", $mem_id);
        $offiorders->execute();
        $offiorder = $offiorders->fetchAll(PDO::FETCH_ASSOC);

        //   --取一般商品訂單明細資料
        $sqlorderlist = "SELECT *
        FROM official_order_list l
        JOIN official_order o ON l.`offi_order_no`= o.`offi_order_no`
        JOIN official_product p ON l.`prod_no`= p.`prod_no`
        where o.`mem_id` = :mem_id
        order by offi_order_cdate desc";

        $orderlists = $pdo->prepare($sqlorderlist);
        $orderlists->bindValue(":mem_id", $mem_id);
        $orderlists->execute();
        $orderlist = $orderlists->fetchAll(PDO::FETCH_ASSOC);
        // echo 'orderlist:'.$orderlist;

        //   --取裝飾品訂單明細資料
        $sqlorderdeco = "SELECT *
        FROM deco_order_list d
        JOIN official_order o ON d.`offi_order_no`= o.`offi_order_no`
        JOIN decoration n ON n.`deco_no`= d.`deco_no`
        where o.`mem_id` = :mem_id
        order by offi_order_cdate desc";

        $orderdecos = $pdo->prepare($sqlorderdeco);
        $orderdecos->bindValue(":mem_id", $mem_id);
        $orderdecos->execute();
        $orderdeco = $orderdecos->fetchAll(PDO::FETCH_ASSOC);


        //   --取團購訂單資料
        $sqlgroup = "SELECT *
        FROM group_shopping s
        LEFT JOIN group_order g ON g.`grp_no`=s.`grp_no`
        LEFT JOIN custom_product c ON c.`cust_no`=s.`cust_no`
        where g.`mem_id` = :mem_id";
        $groups = $pdo->prepare($sqlgroup);
        $groups->bindValue(":mem_id", $mem_id);
        $groups->execute();

        //   --取收藏資料
        $sqlcollect = "SELECT *
        from collect_list l
        JOIN official_product p ON l.`prod_no` = p.`prod_no`
        where l.`mem_id` = :mem_id";
        $collects = $pdo->prepare($sqlcollect);
        $collects->bindValue(":mem_id", $mem_id);
        $collects->execute();

    } catch (PDOException $e) {
        $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
        $errMsg .= "錯誤行號 : " . $e->getLine() . "<br>";
        echo $errMsg;
    }
} else {
    //登出狀態自動跳轉到首頁
    header("Location: index_fron.html");
    exit();
}

?>

<?php
require_once "header.html"; //共用navbar//
?>


<?php
while ($member = $members->fetch(PDO::FETCH_ASSOC)) {
    ?>
<!-- 會員個人資料區start -->
<div class="mem_titleshow">
    <h2>會員專區</h2>
</div>

<section class="mem_main">
    <div class="main_container">
        <form action="fileUpload.php" method="post" enctype="multipart/form-data" id="mem_profile">
            <!-- 上傳大頭照 -->
            <table class="mem_pic_info">
                <tr>
                    <td>
                        <div class="mem_pic_look">
                            <img id="head_pic" src="<?=$member["mem_img"]?>">
                        </div>
                        <label class="mem_pic_up">
                            <!-- <p>上傳大頭貼<img src="../images/tina/pen.png" alt="編輯"></p> -->
                            <p>上傳大頭貼
                                <i class="fas fa-pen"></i>
                            </p>
                            <input type="file" name="upFile" id="upFile" accept="image/*" multiple>
                        </label>
                    </td>
                </tr>
            </table>
            <!-- 中間區塊會員資料star -->
            <table class="mem_personal">
                <tr>
                    <td>
                        <input type="hidden" name="memNo" value="">
                        <p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            帳號：<?=$member["mem_id"]?>
                            <input type="hidden" name="memId" value="<?=$member["mem_id"]?>" maxlength="15" id="memId" readonly>
                            <!-- <i class="fas fa-pen" style="display:none"></i> -->
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            密碼：
                            <input type="password" name="memPsw" value="<?=$member["mem_psw"]?>" maxlength="15" readonly id="password">
                            <i class="fas fa-pen modify_mem"></i>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            姓名：
                            <input type="text" name="memName" value="<?=$member["mem_name"]?>" maxlength="12" readonly id="memName">
                            <i class="fas fa-pen modify_mem"></i>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            電話：
                            <input type="tel" name="memTel" value="<?=$member["mem_tel"]?>" maxlength="10" readonly id="memPhone">
                            <i class="fas fa-pen modify_mem"></i>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>
                            信箱：
                            <input type="email" name="email" value="<?=$member["mem_email"]?>" maxlength="20" readonly id="email">
                            <i class="fas fa-pen modify_mem"></i>
                        </p>
                    </td>
                </tr>
            </table>
            <!-- 中間區塊會員資料end -->

            <!-- 確認修改 -->
            <table class="mem_modify">
                <tr>
                    <td>
                        <p>
                            目前點數:
                            <span id="mem_point"><?=$member["mem_point"]?></span>
                            <!-- <input type="text" name="point" value=""> -->
                            <!-- <i class="fas fa-pen" onclick="modInfon5()"></i> -->
                        </p>
                        <!-- <div>
                            <input type="button" class="btnpoint" id="btnpoint" value="加值點數">
                        </div> -->
                    </td>
                    <tr>
                        <td>
                            <div class="modify">
                                <input type="submit" class="subscribe" id="btnmodify" value="確認修改">
                            </div>
                        </td>
                    </tr>
                </tr>
            </table>
        </form>
    </div>
</section>
<?php
}
?>
<!-- 會員個人資料區end -->

<!-- 功能選單區start -->
<section class="member_tabs">
    <div class="tab_container">
        <!-- tab選單star -->
        <div class="tablinks">
            <div class="tab_btn" id="tb1">訂單管理</div>
            <div class="tab_btn" id="tb2">團購管理</div>
            <div class="tab_btn" id="tb3">收藏管理</div>
        </div>
        <!-- tab選單end -->
        <!-- 選單顯示面板 -->
        <div class="wrap_tab_panel">
        <!-- 訂單管理star -->
            <div class="tab_panel tab_order" id="tb1" style="display: block">
                <?php
                for ($i = 0; $i < count($offiorder); $i++) {
                ?>
                <div class="orders">
                    <div class="order_list">
                        <table>
                            <tr>
                                <th>訂單編號 :</th>
                                <td><?=$offiorder[$i]["offi_order_no"]?></td>
                            </tr>
                            <tr>
                                <th>會員帳號 :</th>
                                <td><?=$offiorder[$i]["mem_id"]?></td>
                            </tr>
                            <tr>
                                <th>建立日期 :</th>
                                <td><?=$offiorder[$i]["offi_order_cdate"]?></td>
                            </tr>
                            <tr>
                                <th>出貨狀態 :</th>
                                <td><?=$offiorder[$i]["offi_order_stat"]?></td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <th>收件人姓名 :</th>
                                <td><?=$offiorder[$i]["reci_name"]?></td>
                            </tr>
                            <tr>
                                <th>收件人電話 :</th>
                                <td><?=$offiorder[$i]["reci_tel"]?></td>
                            </tr>
                            <tr>
                                <th>收件人地址 :</th>
                                <td><?=$offiorder[$i]["reci_addr"]?></td>
                            </tr>
                            <tr>
                                <th>訂單總額 :</th>
                                <td><?=$offiorder[$i]["offi_order_no"]?></td>
                            </tr>
                        </table>
                    </div>
                    <!-- --訂單明細----------------------------------------- -->
                    <!-- ========一般商品明細===================================================== -->
                    
                    <div class="order_items">
                        <h3 class="items_title">訂單明細 v</h3>
                        
                        <div class="item_detail">
                            <ul class="detail_title">
                                <li>商品</li>
                                <li>名稱</li>
                                <li>數量</li>
                                <li>小計</li>
                            </ul>
                            <?php
                            for ($j = 0; $j < count($orderlist); $j++) {
                            if ($offiorder[$i]["offi_order_no"] == $orderlist[$j]["offi_order_no"]) {
                            ?>
                            <ul class="detail_content">
                                <li>
                                    <img src="<?=$orderlist[$j]["prod_img"]?>" alt="">
                                </li>
                                <li><?=$orderlist[$j]["prod_name"]?></li>
                                <li><?=$orderlist[$j]["order_num"]?></li>
                                <li><?=$orderlist[$j]["prod_price"]?></li>
                            </ul>
                            <?php
                            }
                                }
                            ?>
                            <!-- //裝飾品明細 -->
                            <?php
                            for ($j = 0; $j < count($orderdeco); $j++) {
                            if ($offiorder[$i]["offi_order_no"] == $orderdeco[$j]["offi_order_no"]) {
                            ?>
                            <ul class="detail_content">
                                <li>
                                    <img src="<?=$orderdeco[$j]["deco_img"]?>" alt="">
                                </li>
                                <li><?=$orderdeco[$j]["deco_name"]?></li>
                                <li><?=$orderdeco[$j]["order_num"]?></li>
                                <li><?=$orderdeco[$j]["deco_price"]?></li>
                            </ul>
                            <?php
                            }
                                }
                            ?>
                        </div>
                    </div>
                    
                    <!-- ========裝飾品明細===================================================== -->
                    
                    
                    

                    </div>
                <?php
                }
                ?>
            </div>
            <!-- 訂單管理end -->

            <!-- 團購管理star -->
            <div class="tab_panel tab_goupshop " id="tb2" style="display: none">
                <div class="groupshops">
                    <ul class="groupshop_title">
                        <li>商品</li>
                        <li>團購編號</li>
                        <li>商品名稱</li>
                        <li>目前進度</li>
                        <li>團購金額</li>
                    </ul>
                <?php
                while ($group = $groups->fetch(PDO::FETCH_ASSOC)) {
                ?>
                    <ul class="groupshop_detail">
                        <li class="groupshop_detail_img"><img src="<?=$group["cust_img"]?>" alt="#" ></li>
                        <li><?=$group["grp_no"]?></li>
                        <li><?=$group["cust_name"]?></li>
                        <li><?=$group["grp_order_stat"]?></li>
                        <li><?=$group["grp_order_num"]?></li>
                    </ul>
                <?php
                }
                ?>
                </div>
            </div>

            <!-- 團購管理end -->

            <!-- 收藏管理star -->
            <div class="tab_panel tab_collect " id="tb3" style="display: none">
                <div class="collects">
                <?php
                while ($collect = $collects->fetch(PDO::FETCH_ASSOC)) {
                ?>
                    <div class="collect_item">
                        <img src="<?=$collect["prod_img"]?>" alt="" class="collect_img">
                        <div class="collect_text">
                            <p class="collect_name"><?=$collect["prod_name"]?></p>
                            <p class="collect_price">$<?=$collect["prod_price"]?></p>
                        </div>
                        <div class="collect_btn">
                            <!-- <button class="collect_car">加入購物車</button> -->
                            <!-- <button class="collect_trash">
                                <i class="far fa-trash-alt"></i>
                            </button> -->
                        </div>
                    </div>
                <?php
                }
                ?>
                </div>
            </div>
            <!-- 收藏管理end -->

        </div>
    </div>

</section>
<!-- 功能選單區end -->

<!-- 共用footer -->
<footer class="layout_footer">
    <div class="layout_footericons">
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-line"></i>
    </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
<script src="js/member_center.js"></script>

<script>
window.addEventListener("load",function(){
    document.title = "會員專區";
    document.body.classList.add("mem_show");

})

</script>

</body>

</html>